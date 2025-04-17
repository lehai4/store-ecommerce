import { mockAPI } from "@/api/mockAPI";
import { Link } from "react-router-dom";
import { Select, Input, Pagination, Spin } from "antd";
import { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import SendEmail from "./SendEmail";
import shop_background from "@/assets/img/shop_background.jpg";
const Blog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [blogs, setBlogs] = useState(mockAPI.blogs);
  const [featuredBlogs, setFeaturedBlogs] = useState(mockAPI.blogs.slice(0, 3));
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Số blogs mỗi trang

  useEffect(() => {
    if (selectedCategory === "all") {
      setIsLoading(true);
      setTimeout(() => {
        setBlogs(mockAPI.blogs);
        setIsLoading(false);
      }, 3000);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setBlogs(
          mockAPI.blogs.filter((blog) => blog.category === selectedCategory)
        );
        setIsLoading(false);
      }, 3000);
    }
    setFeaturedBlogs(mockAPI.blogs.slice(0, 3));
  }, [selectedCategory]);

  const indexOfLastBlog = currentPage * pageSize;
  const indexOfFirstBlog = indexOfLastBlog - pageSize;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="blog-page">
      {/* header */}
      <div className="blog-header pb-16">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="container mx-auto h-full">
              <div className="h-full flex flex-col justify-center items-center w-full md:w-1/2 mx-auto gap-6">
                <h1 className="text-4xl font-bold text-white mb-4">Our Blog</h1>
                <p className="text-xl text-white/80">
                  Discover the latest news, tips and user guides
                </p>
              </div>
            </div>
          </div>
          <img
            src={shop_background}
            alt="blog"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* content */}
      <div className="container mx-auto">
        <div className="py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="col-span-12 lg:col-span-8">
              <div className="container mx-auto py-8">
                <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredBlogs.map((blog) => (
                    <div
                      className="relative h-[400px] rounded-lg overflow-hidden"
                      key={blog.id}
                    >
                      <img
                        src={blog.image}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent hover:scale-105  transition-all duration-300">
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                          <h3 className="text-2xl font-bold mb-2">
                            {blog.title}
                          </h3>
                          <p className="line-clamp-2">{blog.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="container mx-auto py-8">
                <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
                  <div className="flex gap-4">
                    <Select
                      defaultValue="all"
                      style={{ width: 120 }}
                      value={selectedCategory}
                      onChange={(value) => {
                        setSelectedCategory(value);
                      }}
                    >
                      <Select.Option value="all">All Posts</Select.Option>
                      <Select.Option value="Technology">
                        Technology
                      </Select.Option>
                      <Select.Option value="Design">Design</Select.Option>
                    </Select>
                    <Input.Search
                      placeholder="Search articles..."
                      style={{ width: 250 }}
                    />
                  </div>
                </div>
              </div>
              <div className="blog-content py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading ? (
                    <Spin indicator={<LoadingOutlined spin />} size="large" />
                  ) : (
                    currentBlogs.map((blog) => (
                      <div
                        className="col-span-1 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                        key={blog.id}
                      >
                        <Link to={`/blog/${blog.title}`}>
                          <div className="relative">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                {blog.category}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                              {blog.title}
                            </h3>
                            <p className="text-gray-600 mb-4 line-clamp-2">
                              {blog.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <img
                                  src={blog.author.avatar}
                                  className="w-8 h-8 rounded-full"
                                />
                                <span className="text-sm text-gray-500">
                                  {blog.author.name}
                                </span>
                              </div>
                              <span className="text-sm text-gray-500">
                                {blog.date}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <Pagination
                  current={currentPage}
                  total={blogs.length}
                  pageSize={pageSize}
                  onChange={(page) => setCurrentPage(page)}
                  showSizeChanger={false}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-span-12 lg:col-span-4">
              <div className="mt-22">
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-bold mb-4">Popular Posts</h3>
                  {/* Popular posts list */}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-bold mb-4">Categories</h3>
                  {/* Categories list */}
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all duration-300">
                  <h3 className="text-lg font-bold mb-4">Tags</h3>
                  {/* Tags cloud */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SendEmail />
    </div>
  );
};

export default Blog;
