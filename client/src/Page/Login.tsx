import { apiUser } from "@/api/apiConnect/user/apiUser";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  setStatusLogin,
  setStatusLogout,
  setUser,
} from "@/store/slices/authen/index";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        toast.success("Đăng nhập thành công");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-[500px] p-8">
        <p
          style={{ textAlign: "center", marginBottom: "20px" }}
          className="text-blue-500 text-4xl font-bold"
        >
          SoaFStore
        </p>
        <p
          className="text-2xl font-bold"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Welcome back
        </p>
        <p
          style={{ textAlign: "center", marginBottom: "20px" }}
          className="text-gray-500"
        >
          Sign in to continue your experience
        </p>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical"
          style={{
            background: "#fff",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              size="large"
              prefix={<span className="text-gray-500">📧</span>}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              size="large"
              prefix={<span className="text-gray-500">🔑</span>}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "100%" }}
            >
              Sign in
            </Button>
          </Form.Item>
          <Form.Item className="text-center text-md">
            Don't have an account?
            <Link to="/register"> Sign up</Link>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
