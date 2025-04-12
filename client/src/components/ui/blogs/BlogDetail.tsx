import { Link, useParams } from "react-router-dom";
import blog_single_background from "@/assets/img/blog_single_background.jpg";
import { mockAPI } from "@/api/mockAPI";
import SendEmail from "@/Page/user/SendEmail";
import { useEffect, useState } from "react";
const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState<any>(null);

  const getRandomBlogs = (
    currentBlogId: string,
    allBlogs: any[],
    count: number
  ) => {
    // Lọc bỏ blog hiện tại
    const otherBlogs = allBlogs.filter((blog) => blog.id !== currentBlogId);

    // Trộn ngẫu nhiên mảng
    const shuffled = [...otherBlogs].sort(() => Math.random() - 0.5);

    // Lấy 3 bài đầu tiên
    return shuffled.slice(0, count);
  };
  // Sau đó sử dụng trong component
  const relatedBlogs = getRandomBlogs(blog?.id, mockAPI.blogs, 3);

  useEffect(() => {
    setBlog(mockAPI.blogs.find((blog) => blog.title.includes(id ?? "")));
  }, [id]);

  return (
    <div className="blog-detail">
      {/* header */}
      <div className="blog-headerpy-16">
        <img
          src={blog_single_background}
          alt="blog"
          className="w-full h-full object-cover"
        />
      </div>
      {/* content */}
      <div className="container mx-auto">
        <div className="py-8">
          {/* Main Content */}
          <div className="col-span-12">
            <div className="flex flex-col justify-center items-center w-full md:w-1/2 mx-auto gap-6">
              <div className="blog-title">
                <h1 className="text-4xl font-bold text-center">
                  {blog?.title}
                </h1>
              </div>
              <div className="blog-content">
                <div className="blog-content-image">
                  <img src={blog?.image} alt="blog" className="w-full" />
                </div>
                <div className="blog-content-text mt-10">
                  <p className="text-gray-500 text-lg leading-8 tracking-wider">
                    {blog?.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 pb-16">
          <h1 className="text-2xl my-2 font-bold">Related Blogs</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedBlogs.map((blog) => (
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
                      <span className="text-sm text-gray-500">{blog.date}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SendEmail />
    </div>
  );
};

export default BlogDetail;
