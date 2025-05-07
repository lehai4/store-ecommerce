import { apiUser } from "@/api/apiConnect/user/apiUser";
import { Product } from "@/types/admin";
import { topDeals } from "@/types/user";
import { slugify } from "@/utils";
import { Col, Pagination, Row, Skeleton, Tabs } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const DealsProduct = () => {
  const navigate = useNavigate();
  const [topDeals] = useState<topDeals[]>([
    { id: 1, name: "Featured" },
    { id: 2, name: "On Sale" },
    { id: 3, name: "Best Rate" },
  ]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [limit] = useState<number>(8); // Số sản phẩm mỗi trang

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTopDeals, setSelectedTopDeals] = useState<number>(1);
  const [dataTopDeals, setDataTopDeals] = useState<Product[]>([]);

  function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const fetchTopDeals = async (selectedTopDeals: string, page = 1) => {
    try {
      const query = new URLSearchParams({
        type: selectedTopDeals,
        page: page.toString(),
        limit: limit.toString(),
      });

      setLoading(true);
      await delay(1500); // Delay 2 giây

      const response = await apiUser.getTopDeals(query);
      setDataTopDeals(response.data);
      setTotalPages(response.pagination.totalPages);
      setCurrentPage(response.pagination.currentPage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    const findSelectedTopDeals = topDeals.find(
      (deal) => deal.id === selectedTopDeals
    );
    if (findSelectedTopDeals) {
      fetchTopDeals(findSelectedTopDeals.name, page);
    }
  };

  useEffect(() => {
    const findSelectedTopDeals = topDeals.find(
      (deal) => deal.id === selectedTopDeals
    );
    if (findSelectedTopDeals) {
      fetchTopDeals(findSelectedTopDeals.name);
    }
  }, [selectedTopDeals]);

  return (
    <div className="deals-product py-[50px]">
      <div className="container mx-auto">
        <Row align={"middle"}>
          <Col span={24} sm={24} md={24} lg={8}>
            <h2 className="text-2xl font-semibold">DealsProduct</h2>
          </Col>
          <Col span={24} sm={24} md={24} lg={16}>
            <div className="w-full">
              <div className="top-deals-product">
                <div className="top-deals-product-item">
                  <div className="top-deals-product-category">
                    <Tabs
                      onChange={(key) => {
                        setSelectedTopDeals(Number(key));
                      }}
                    >
                      {topDeals.map((deal) => (
                        <Tabs.TabPane
                          tab={
                            <span className="text-gray-500 font-semibold text-lg">
                              {deal.name}
                            </span>
                          }
                          key={deal.id}
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                            {loading ? (
                              <>
                                {Array(limit)
                                  .fill(0)
                                  .map((_, index) => (
                                    <div
                                      key={index}
                                      className="group border rounded-lg border-gray-300 hover:shadow-2xl transition-all ease-in cursor-pointer relative overflow-hidden flex flex-col items-center text-center p-4"
                                    >
                                      <div className="w-full flex justify-center">
                                        <Skeleton.Image
                                          active
                                          style={{ width: 120, height: 120 }}
                                        />
                                      </div>
                                      <div className="w-full flex justify-center mt-4">
                                        <Skeleton
                                          active
                                          paragraph={{ rows: 2 }}
                                          style={{ width: 120 }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                              </>
                            ) : (
                              <>
                                {dataTopDeals.length > 0 ? (
                                  <>
                                    {dataTopDeals.map((deal) => (
                                      <div
                                        key={deal._id}
                                        className="group border rounded-lg border-gray-300 hover:shadow-2xl transition-all ease-in cursor-pointer relative overflow-hidden"
                                      >
                                        <div className="flex flex-col justify-between items-center h-full gap-2">
                                          <div className="top-deals-product-item-content-image my-4">
                                            <img
                                              src={deal.image}
                                              alt={deal.nameProduct}
                                              className="w-full h-full object-cover"
                                            />
                                          </div>
                                          <div className="top-deals-product-item-content-info mb-4 text-center">
                                            <div className="flex flex-col justify-center items-center">
                                              <p className="text-lg text-red-500 font-semibold">
                                                ${deal.price}
                                              </p>
                                              <h3 className="text-lg font-semibold">
                                                {deal.nameProduct}
                                              </h3>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Overlay xuất hiện khi hover */}
                                        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)] bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                                          <div className="text-white text-center">
                                            <p className="text-sm mb-2 cursor-pointer">
                                              <Link
                                                to={`/product/${slugify(
                                                  deal.nameProduct
                                                )}`}
                                              >
                                                Chi tiết sản phẩm
                                              </Link>
                                            </p>
                                            <button
                                              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition-all ease-in duration-100 cursor-pointer"
                                              onClick={() => {
                                                navigate("/cart");
                                              }}
                                            >
                                              Mua ngay
                                            </button>
                                          </div>
                                        </div>

                                        {/* Pagination */}
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <div className="font-semibold text-md">
                                    Không có sản phẩm !
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </Tabs.TabPane>
                      ))}
                    </Tabs>
                    {dataTopDeals.length > 0 && (
                      <div className="mt-4 flex justify-center">
                        <Pagination
                          current={currentPage}
                          total={totalPages * limit}
                          pageSize={limit}
                          onChange={handlePageChange}
                          showSizeChanger={false}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DealsProduct;
