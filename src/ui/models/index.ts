import { Exclude, Expose } from "class-transformer";

@Exclude()
export class RecordModel {
  @Expose()
  username: string;

  @Expose()
  type: string;

  @Expose()
  date: string;
}
