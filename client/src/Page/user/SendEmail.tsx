import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { setEmail } from "@/store/slices/subscribe";
import { Form, Input } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
const SendEmail = () => {
  const sub = useAppSelector((state) => state.subscribe);

  const dispatch = useAppDispatch();
  const [form] = Form.useForm();

  const onFinish = (values: string) => {
    if (sub.email) {
      toast.success("Unsubscribe successfully");
      dispatch(setEmail(null));
    } else {
      if (values === "") {
        toast.warning("Please enter your email");
      }
      form.resetFields();
      toast.success("Subscribe successfully");
      dispatch(setEmail(values));
    }
  };

  useEffect(() => {
    console.log(sub.email);
  }, [sub]);

  return (
    <div className="send-email">
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-[28px] font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Get the latest posts delivered right to your inbox
          </p>
          <div className="max-w-md mx-auto">
            <Form form={form}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                {sub.email ? (
                  <Input.Search
                    placeholder="Enter your email"
                    enterButton="Unsubscribe"
                    size="large"
                    onSearch={(value) => onFinish(value)}
                  />
                ) : (
                  <Input.Search
                    placeholder="Enter your email"
                    enterButton="Subscribe"
                    size="large"
                    onSearch={(value) => onFinish(value)}
                  />
                )}
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
