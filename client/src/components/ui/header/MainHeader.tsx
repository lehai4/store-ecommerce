import {
  HeartOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Col, Popover, Row, Space } from "antd";
import Link from "antd/es/typography/Link";

const MainHeader = () => {
  return (
    <div className="border-b border-gray-200">
      <div className="h-auto md:h-[175px] w-full container mx-auto">
        <Row className="h-full flex-col md:flex-row py-4 md:py-0">
          <Col
            xs={24}
            md={6}
            className="flex flex-row justify-between md:block"
          >
            <div className="logo md:relative md:top-1/2 md:-translate-y-1/2">
              <div className="flex flex-row justify-between items-center gap-4">
                <Link href="/#" className="!text-[36px] font-bold">
                  SoaFStore
                </Link>
                <div className="flex md:hidden items-center gap-8">
                  <Popover
                    content={<div>No wishlist</div>}
                    placement="bottomRight"
                  >
                    <div className="flex items-center gap-2">
                      <HeartOutlined className="text-[34px]" />
                      <Space direction="vertical" className="!gap-0">
                        <span className="text-[18px] font-medium">
                          Wishlist
                        </span>
                        <span className="text-[14px] text-gray-500">110</span>
                      </Space>
                    </div>
                  </Popover>

                  <Popover content={<div>No product in cart</div>}>
                    <div className="flex flex-row items-center gap-2">
                      <ShoppingCartOutlined className="text-[34px]" />
                      <Space direction="vertical" className="!gap-0">
                        <span className="text-[18px] font-medium">Cart</span>
                        <span className="text-[14px] text-gray-500">$100</span>
                      </Space>
                    </div>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Move Cart & Wishlist here for mobile */}
            <div className="hidden md:hidden items-center gap-6">
              <div className="flex items-center gap-2">
                <HeartOutlined className="text-2xl" />
                <span className="text-gray-500">110</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingCartOutlined className="text-2xl" />
                <span className="text-gray-500">$100</span>
              </div>
            </div>
          </Col>

          <Col xs={24} md={8} className="py-4 md:py-0">
            <div className="flex items-center h-full">
              <div className="w-full flex">
                <div className="flex flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search for products..."
                    className="w-full h-[40px] px-4 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
                  />
                  <div className="relative inline-block">
                    <select className="h-[40px] px-4 border border-l-0 border-gray-300 bg-white focus:outline-none appearance-none pr-8 cursor-pointer">
                      <option value="smartphones">Smartphones</option>
                      <option value="laptops">Laptops</option>
                      <option value="tablets">Tablets</option>
                    </select>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        className="w-4 h-4 fill-gray-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M7 10l5 5 5-5H7z" />
                      </svg>
                    </div>
                  </div>
                  <button className="h-[40px] px-6 bg-[#0d6efd] hover:bg-[#0b5ed7] transition-colors rounded-r-md">
                    <SearchOutlined className="!text-white text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </Col>

          {/* Hide on mobile */}
          <Col xs={0} md={10}>
            <div className="h-full flex flex-row items-center justify-end gap-10">
              <Popover content={<div>No wishlist</div>} placement="bottomRight">
                <div className="flex flex-row items-center gap-4">
                  <HeartOutlined className="text-[34px]" />
                  <Space direction="vertical" className="!gap-0">
                    <span className="text-[18px] font-medium">Wishlist</span>
                    <span className="text-[14px] text-gray-500">110</span>
                  </Space>
                </div>
              </Popover>

              <Popover
                content={<div>No product in cart</div>}
                placement="bottomRight"
              >
                <div className="flex flex-row items-center gap-4">
                  <ShoppingCartOutlined className="text-[34px]" />
                  <Space direction="vertical" className="!gap-0">
                    <span className="text-[18px] font-medium">Cart</span>
                    <span className="text-[14px] text-gray-500">$100</span>
                  </Space>
                </div>
              </Popover>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default MainHeader;
