import { Col, Menu } from "antd";

import { Row } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="border-b border-gray-200 shadow-md">
      <div className="h-auto md:h-[55px] w-full container mx-auto">
        <Row className="h-full">
          <Col xs={24} md={8}>
            {/* Category */}
          </Col>
          <Col xs={24} md={16}>
            {/* Menu */}
            <Menu
              mode="horizontal"
              className="h-full !text-[18px]"
              selectedKeys={[location.pathname]}
              onClick={(e) => {
                navigate(e.key);
              }}
            >
              <Menu.Item key="/">Home</Menu.Item>
              <Menu.Item key="/products">Products</Menu.Item>
              <Menu.Item key="/blogs">Blog</Menu.Item>
              <Menu.Item key="/about">About</Menu.Item>
              <Menu.Item key="/contact">Contact</Menu.Item>
            </Menu>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Navbar;
