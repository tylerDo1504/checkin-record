import Database from "better-sqlite3";
import { app } from "electron";
import * as fs from "fs";
import * as path from "path";
import { readExcelFile } from "../utils/excel";

const DATABASE_FILE = path.join(app.getPath("userData"), "app.db");
const EXCEL_FILE = path.join(__dirname, "assets/Demo-data.xlsx"); // Adjust the path to access the public directory

export async function initializeDatabase() {
  const dbExists = fs.existsSync(DATABASE_FILE);
  const db = new Database(DATABASE_FILE);

  if (!dbExists) {
    console.log("Database does not exist. Initializing from Excel file.");
    await loadExcelToDatabase(db);
  } else {
    const tables = getAllTables();
    if (tables.length === 0) {
      console.log("No tables found. Initializing from Excel file.");
      await loadExcelToDatabase(db);
    } else {
      console.log("Database exists with tables. Using existing data.");
    }
  }

  return db;
}

export function getAllTables() {
  const db = new Database(DATABASE_FILE);
  try {
    const tables = db
      .prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
      )
      .all();
    return tables;
  } catch (err) {
    console.error("Error fetching tables from database:", err);
    throw err;
  } finally {
    db.close();
  }
}

export function getAllData() {
  const db = new Database(DATABASE_FILE);

  try {
    const rows = db.prepare("SELECT * FROM checkin").all();
    return rows;
  } catch (err) {
    console.error("Error fetching data from database:", err);
    throw err;
  } finally {
    db.close();
  }
}

async function loadExcelToDatabase(db: Database.Database) {
  return new Promise<void>((resolve, reject) => {
    const data = readExcelFile(EXCEL_FILE);

    try {
      db.exec(`
                CREATE TABLE IF NOT EXISTS checkin (
                    username TEXT,
                    type TEXT,
                    date TEXT,
                    UNIQUE(username, type, date)
                )
            `);

      const stmt = db.prepare(`
                INSERT OR IGNORE INTO checkin (username, type, date) VALUES (?, ?, ?)
            `);

      const insertTransaction = db.transaction((rows: string[][]) => {
        for (const row of rows) {
          stmt.run(row[0], row[1], row[2]);
        }
      });

      insertTransaction(data);

      resolve();
    } catch (err) {
      reject(err);
    }
  });
}
