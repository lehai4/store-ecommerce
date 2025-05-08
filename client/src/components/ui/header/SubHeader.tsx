import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import {
  setStatusLogin,
  setStatusLogout,
  setUser,
} from "@/store/slices/authen";
import {
  LockOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Divider, Modal, Popover } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const SubHeader = () => {
  const { user } = useAppSelector((state) => state.authen);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [profileModal, setProfileModal] = useState<boolean>(false);
  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  return (
    <div className="border-b border-gray-200 bg-[#fafafa]">
      <div className="hidden sm:block md:block lg:block sm:h-[40px] md:h-[55px] lg:h-[55px] w-full container mx-auto">
        {/* Thông tin liên hệ */}
        <div className="h-full flex flex-row justify-between items-center">
          <div className="flex flex-row justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-10 text-[12px] md:text-[14px] lg:text-[16px]">
            <div>
              <span>📱</span>
              <a href="tel:+380680053570">+38 068 005 3570</a>
            </div>

            <div>
              <span>📧</span>
              <a href="mailto:info@gmail.com">info@gmail.com</a>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between gap-2 sm:gap-4 md:gap-6 lg:gap-10 text-[12px] md:text-[14px] lg:text-[16px]">
            <div>
              {/* ngôn ngữ */}
              English
            </div>
            {user ? (
              <div className="cursor-pointer">
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
                  <UserOutlined />
                  {user && <span className="ml-2">{user?.name}</span>}
                </Popover>
              </div>
            ) : (
              <>
                <Button type="link">
                  <Link
                    to="/register"
                    className="flex flex-row items-center gap-2"
                  >
                    <UserAddOutlined />
                    Register
                  </Link>
                </Button>
                <Button type="link">
                  <Link
                    to="/login"
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
export default SubHeader;
