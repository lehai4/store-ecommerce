import { mockAPI } from "@/api/mockAPI";
import banner from "@/assets/img/banner_background.jpg";
import banner_product from "@/assets/img/banner_product.png";
import DealsProduct from "@/components/ui/products/DealsProduct";
import { FloatButton, Image, Space } from "antd";
import SendEmail from "./SendEmail";
const Home = () => {
  const characteristics = mockAPI.characteristics;

  return (
    <main className="main">
      <div className="banner w-full py-[68px] relative">
        <img
          src={banner}
          alt="banner"
          className="w-full h-full object-cover absolute top-0 left-0 bg-no-repeat bg-cover bg-center"
        />
        <div className="container">
          <div className="flex flex-wrap h-full">
            <div className="banner_product_image absolute z-0 opacity-50 right-[15px] w-[60vw] top-[50%] translate-y-[-50%] sm:translate-y-[-50%] sm:opacity-50 sm:w-[60vw] sm:top-[50%] md:w-[40vw] md:w-auto">
              <img src={banner_product} alt="banner_product" />
            </div>
            <div className="md:w-full lg:w-5/12 lg:ml-[33.333333%] h-full">
              <div className="banner_content relative z-10">
                <h1 className="banner_text uppercase font-semibold text-shadow text-[#7599b2] text-[24px] sm:text-[35px] md:text-[40px] lg:text-[48px] tracking-[1.824px]">
                  new era of smartphones
                </h1>
                <div className="banner_price mt-[23px] text-[18px] sm:text-[25px] md:text-[28px] lg:text-[30px] sm:mt-[50px] md:mt-[70px] lg:mt-[87px] text-[#df3b3b]">
                  <span className="inline-block relative text-[#7e8285] mr-[14px] after:block after:absolute after:left-0 after:w-full after:h-[2px] after:bg-[#8d8d8d] after:top-[21px]">
                    $530
                  </span>
                  $460
                </div>
                <div className="banner_product_name text-[18px] font-[400] mt-[8px]">
                  Apple Iphone 6s
                </div>

                <div className="mt-[42px] inline-block bg-[#0e8ce4] rounded-[5px] h-[32px] sm:h-[48px] md:h-[48px] lg:h-[48px] hover:opacity-75 transition-opacity duration-150 ease-in">
                  <a
                    href="/product"
                    className="block text-[12px] sm:text-[18px] md:text-[18px] lg:text-[18px] font-[400] leading-[32px] sm:leading-[48px] md:leading-[48px] lg:leading-[48px] !text-white px-[25px] sm:px-[35px] md:px-[35px] ld:px-[35px]"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Characteristics */}
      <div className="characteristics">
        <div className="py-[70px]">
          <div className="container">
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {characteristics.map((characteristic) => (
                <div
                  key={characteristic.id}
                  className="rounded-md shadow-md border-[#e8e8e8] border p-6 hover:shadow-lg transition-all duration-300"
                >
                  <Space direction="horizontal" size={16}>
                    <Image
                      src={characteristic.icon}
                      alt={characteristic.title}
                      preview={false}
                      className="w-12 h-12"
                    />
                    <div className="flex flex-col gap-2">
                      <h2 className="text-lg font-bold">
                        {characteristic.title}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {characteristic.description}
                      </p>
                    </div>
                  </Space>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <DealsProduct />
      <SendEmail />
      <FloatButton.BackTop visibilityHeight={0} />
    </main>
  );
};

export default Home;
