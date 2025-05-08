import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import {
  setStatusLogin,
  setStatusLogout,
  setUser,
} from "@/store/slices/authen";
import {
  HeartOutlined,
  LockOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Popover, Row, Space, Modal, Badge } from "antd";
import Link from "antd/es/typography/Link";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const MainHeader = () => {
  const { user } = useAppSelector((state) => state.authen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [profileModal, setProfileModal] = useState<boolean>(false);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  return (
    <div className="border-b border-gray-200">
      <div className="h-auto md:h-[175px] w-full container mx-auto">
        <Row className="h-full flex-col md:flex-row py-4 md:py-0">
          <Col
            xs={24}
            md={8}
            className="flex flex-row items-center justify-between md:block"
          >
            <div className="logo md:relative md:top-1/2 md:-translate-y-1/2 w-full">
              <div className="flex flex-row justify-between items-center gap-4">
                <Link
                  href="/#"
                  className="!text-[24px] sm:!text-[26px] md:!text-[30px] lg:!text-[36px] font-bold"
                >
                  SoaFStore
                </Link>
                <div className="flex md:hidden items-center gap-8">
                  <Popover content={<div>No product in cart</div>}>
                    <div className="flex flex-row items-center gap-2">
                      <Badge count={0} showZero>
                        <ShoppingCartOutlined className="text-[20px]" />
                      </Badge>
                      <Space direction="vertical" className="!gap-0"></Space>
                    </div>
                  </Popover>
                  {user ? (
                    <Popover
                      content={
                        <div className="w-48">
                          <div
                            className="flex items-center px-2 py-2 hover:bg-gray-100 transition-all duration-100 ease-in text-sm cursor-pointer"
                            onClick={() => {
                              setProfileModal(true);
                              setPopoverOpen(false);
                            }}
                          >
                            <UserOutlined className="mr-2 text-[14px]" />
                            Thông tin cá nhân
                          </div>
                          <Divider className="!my-1" />
                          <div className="flex items-center px-2 py-2 hover:bg-gray-100 transition-all duration-100 ease-in text-sm cursor-pointer">
                            <LockOutlined className="mr-2" />
                            Đổi mật khẩu
                          </div>
                          <Divider className="!my-1" />

                          <div
                            className="flex items-center px-2 py-2 hover:bg-gray-100 transition-all duration-100 ease-in text-sm cursor-pointer"
                            onClick={() => {
                              navigate("/");
                            }}
                          >
                            <QuestionCircleOutlined className="mr-2" />
                            Hỗ trợ
                          </div>
                          <Divider className="!my-1" />
                          <a
                            href="#"
                            onClick={() => {
                              dispatch(setStatusLogin(false));
                              dispatch(setUser(null));
                              dispatch(setStatusLogout(true));
                            }}
                            className="flex items-center px-2 hover:bg-gray-100 text-sm"
                          >
                            <LogoutOutlined className="mr-2" />
                            Đăng xuất
                          </a>
                        </div>
                      }
                      placement="bottomRight"
                      trigger="click"
                      open={popoverOpen}
                      onOpenChange={setPopoverOpen}
                    >
                      <span className="flex flex-row items-center gap-2 cursor-pointer">
                        <UserOutlined className="text-[20px]" />
                      </span>
                    </Popover>
                  ) : (
                    <>
                      <Button type="link">
                        <Link
                          href="/login"
                          className="flex flex-row items-center gap-2"
                        >
                          <UserOutlined />
                          Login
                        </Link>
                      </Button>
                    </>
                  )}
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
                  {/* <div className="relative inline-block">
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
                  </div> */}
                  <button className="h-[40px] px-6 bg-[#0d6efd] hover:bg-[#0b5ed7] transition-colors rounded-r-md">
                    <SearchOutlined className="!text-white text-lg" />
                  </button>
                </div>
              </div>
            </div>
          </Col>

          {/* Hide on mobile */}
          <Col xs={0} md={8}>
            <div className="h-full flex flex-row items-center justify-end gap-10">
              {/* <Popover content={<div>No wishlist</div>} placement="bottomRight">
                <div className="flex flex-row items-center gap-4">
                  <HeartOutlined className="text-[34px]" />
                  <Space direction="vertical" className="!gap-0">
                    <span className="text-[18px] font-medium">Wishlist</span>
                    <span className="text-[14px] text-gray-500">110</span>
                  </Space>
                </div>
              </Popover> */}

              <Popover
                content={<div>No product in cart</div>}
                placement="bottomRight"
              >
                <div className="flex flex-row items-center gap-4">
                  <Badge count={0} showZero>
                    <ShoppingCartOutlined className="text-[34px]" />
                  </Badge>
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

      <Modal
        open={profileModal}
        onOk={() => setProfileModal(false)}
        onCancel={() => setProfileModal(false)}
        cancelText={null}
        title="Thông tin cá nhân"
        footer={null}
      >
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <p>Họ tên: </p>
            <p className="underline font-semibold">{user?.name}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>Email: </p>
            <p className="underline font-semibold">{user?.email}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>Số điện thoại: </p>
            <p className="underline font-semibold">{user?.phone}</p>
          </div>
          <div className="flex flex-row gap-2">
            <p>Địa chỉ: </p>
            <p className="underline font-semibold">{user?.address}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MainHeader;
