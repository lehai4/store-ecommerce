import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
          404 Not Found
        </h1>
        <p className="sm:text-lg md:text-xl lg:text-2xl">
          The page you are looking for does not exist.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-500 cursor-pointer"
        >
          Go back to home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
