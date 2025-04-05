import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, Space } from "antd";
import { Link } from "react-router-dom";

const SubHeader = () => {
  return (
    <div className="border-b border-gray-200 bg-[#fafafa]">
      <div className="h-[55px] w-full container mx-auto">
        {/* Thông tin liên hệ */}
        <div className="h-full flex flex-row justify-between items-center">
          <div className="flex flex-row justify-between gap-10">
            <div>
              <span>📱</span>
              <a href="tel:+380680053570">+38 068 005 3570</a>
            </div>

            <div>
              <span>📧</span>
              <a href="mailto:info@gmail.com">info@gmail.com</a>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-10">
            <div>
              {/* ngôn ngữ */}
              English
            </div>
            <Space direction="horizontal">
              <Button type="link" icon={<UserAddOutlined />}>
                <Link to="/register">Register</Link>
              </Button>
              <Divider type="vertical" />
              <Button type="link" icon={<UserOutlined />}>
                <Link to="/login">Login</Link>
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SubHeader;
