import type { FormProps } from "antd";
import { Button, Card, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../hooks";

interface ILoginFormValues {
  password?: string;
  confirmPassword?: string;
}

function LoginPage() {
  const [form] = Form.useForm<ILoginFormValues>();
  const navigate = useNavigate();
  const authStore = useAuthStore();

  const onFinish: FormProps<ILoginFormValues>["onFinish"] = (values) => {
    console.log("Success:", values);

    authStore.getState().login();
    navigate("/");
  };

  const onFinishFailed: FormProps<ILoginFormValues>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please Input your password!" }]}
        >
          <Input.Password placeholder="Input password" />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please Input your password Again!" },
          ]}
        >
          <Input.Password placeholder="Input confirm password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default LoginPage;
