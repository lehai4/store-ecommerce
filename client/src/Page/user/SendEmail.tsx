// import { Col, Form, Input, Row, Button } from "antd";
// import sendMail from "@/assets/img/send.png";
// import { MailOutlined } from "@ant-design/icons";
import { Input } from "antd";
const SendEmail = () => {
  // const [form] = Form.useForm();

  // const onFinish = (values: any) => {
  //   console.log(values);
  // };
  return (
    <div className="send-email">
      {/* <div className="bg-[#fafafa] py-10 shadow-2xs border-[#e8e8e8]">
        <div className="container">
          <Row gutter={[50, 50]}>
            <Col span={24} md={12} className="flex flex-row items-center gap-8">
              <div className="flex flex-row items-center gap-8 h-full">
                <img src={sendMail} alt="logo" />
                <div>
                  <h2 className="text-lg">Sign up for Newsletter</h2>
                  <p className="text-gray-500">
                    ...and receive %20 coupon for first shopping.
                  </p>
                </div>
              </div>
            </Col>
            <Col span={24} md={12}>
              <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Invalid email address" },
                  ]}
                >
                  <Input
                    placeholder="Enter your email address"
                    prefix={<MailOutlined className="text-gray-400" />}
                    size="large"
                    className="rounded-lg hover:border-blue-400 focus:border-blue-500"
                    style={{
                      height: "50px",
                      fontSize: "16px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    }}
                  />
                </Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="w-full rounded-lg h-[50px] font-medium text-base hover:opacity-90"
                  style={{
                    background: "linear-gradient(to right, #4F46E5, #3B82F6)",
                  }}
                >
                  Register for newsletter
                </Button>
              </Form>
            </Col>
          </Row>
        </div>
      </div> */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Get the latest posts delivered right to your inbox
          </p>
          <div className="max-w-md mx-auto">
            <Input.Search
              placeholder="Enter your email"
              enterButton="Subscribe"
              size="large"
              onSearch={(value) => console.log(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
