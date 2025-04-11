import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { apiUser } from "@/api/apiConnect/user/apiUser";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  setStatusLogin,
  setUser,
  setStatusLogout,
} from "@/store/slices/authen/index";
const { Title } = Typography;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      const response = await apiUser.login(values);
      if (response.success) {
        dispatch(setStatusLogin(true));
        dispatch(setUser(response.data));
        dispatch(setStatusLogout(false));
        navigate("/");
      } else {
        dispatch(setStatusLogin(false));
        dispatch(setUser(null));
        dispatch(setStatusLogout(true));
        toast.error(response.message);
      }
    } catch (error: any) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    setError(errorInfo.errorFields[0].errors[0]);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center  h-screen">
        <div className="text-2xl font-bold text-red-500 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="text-2xl font-bold text-red-500">{error}!</div>
            <Button type="primary" onClick={() => window.location.reload()}>
              Tải lại trang
            </Button>
          </div>
        </div>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div
        className="fixed top-0 start-0 w-full h-full flex justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 9999 }}
      >
        <div
          className="w-10 h-10 border-4 border-t-transparent border-white rounded-full animate-spin"
          role="status"
        ></div>
        <span className="visually-hidden text-white">Loading...</span>
      </div>
    );
  }
  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: "50px 0" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        LOGIN
      </Title>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: "100%" }}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
