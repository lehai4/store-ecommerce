import { mockAPI } from "@/api/mockAPI";
import banner from "@/assets/img/banner_background.jpg";
import { Image, Space } from "antd";
import SendEmail from "./SendEmail";
const Home = () => {
  const characteristics = mockAPI.characteristics;

  return (
    <main className="main">
      <div className="banner w-full py-[68px] relative">
        <Image
          src={banner}
          alt="banner"
          preview={false}
          className="w-full h-full object-cover absolute top-0 left-0 bg-no-repeat bg-cover bg-center"
        />
        <div className="container">
          <h1 className="text-white text-4xl font-bold">
            Welcome to our website
          </h1>
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
                  className="rounded-md shadow-md border-[#e8e8e8] border p-8 hover:shadow-lg transition-all duration-300"
                >
                  <Space direction="horizontal" size={16}>
                    <Image
                      src={characteristic.icon}
                      alt={characteristic.title}
                      preview={false}
                      className="w-12 h-12"
                    />
                    <div className="flex flex-col gap-2">
                      <h2 className="text-xl font-bold">
                        {characteristic.title}
                      </h2>
                      <p className="text-gray-500">
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
      <div className="products"></div>
      <SendEmail />
    </main>
  );
};

export default Home;
