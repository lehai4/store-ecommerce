import logo1 from "@/assets/img/logos_1.png";
import logo2 from "@/assets/img/logos_2.png";
import logo3 from "@/assets/img/logos_3.png";
import logo4 from "@/assets/img/logos_4.png";
import {
  FacebookOutlined,
  GoogleOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Image } from "antd";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 text-white py-10 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <h4 className="text-2xl font-bold mb-5">SoaFStore</h4>
              <p className="text-sm hover:opacity-80 hover:transition-all hover:duration-300">
                Address: Ap Cong Lac, Xa Binh Dong, Tx Go Cong, Tinh Tien Giang
              </p>
              <p className="text-sm hover:opacity-80 hover:transition-all hover:duration-300">
                Phone: 0909090909
              </p>
              <p className="text-sm hover:opacity-80 hover:transition-all hover:duration-300">
                Email: soafstore@gmail.com
              </p>
              <div className="flex flex-row gap-5 cursor-pointer ">
                <p className="text-2xl">
                  <FacebookOutlined className="hover:text-blue-500 hover:bg-blue-500 hover:transition-all hover:duration-300" />
                </p>
                <p className="text-2xl">
                  <InstagramOutlined className="hover:text-blue-500 hover:bg-blue-500 hover:transition-all hover:duration-300" />
                </p>
                <p className="text-2xl">
                  <GoogleOutlined className="hover:text-blue-500 hover:bg-blue-500 hover:transition-all hover:duration-300" />
                </p>
                <p className="text-2xl">
                  <TwitterOutlined className="hover:text-blue-500 hover:bg-blue-500 hover:transition-all hover:duration-300" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright">
        <div className="container mx-auto py-4 px-4">
          <div className="flex flex-col-reverse sm:flex-row md:flex-row lg:flex-row items-center justify-between gap-5">
            <div>
              <p className="text-sm">
                Copyright © 2025 SoaFStore. All rights reserved.
              </p>
              <p className="text-sm">
                Developed by{" "}
                <a
                  href="https://www.facebook.com/profile.php?id=10008888888888888"
                  className="text-blue-500"
                >
                  SoaFStore
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=10008888888888888"
                  className="text-blue-500"
                >
                  <FacebookOutlined />
                </a>
              </p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <div className="text-sm">
                <Image src={logo1} alt="logo1" />
              </div>
              <div className="text-sm">
                <Image src={logo2} alt="logo2" />
              </div>
              <div className="text-sm">
                <Image src={logo3} alt="logo3" />
              </div>
              <div className="text-sm">
                <Image src={logo4} alt="logo4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
