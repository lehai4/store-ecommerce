import { ToastContainer, ToastPosition } from "react-toastify";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

function App() {
  const props = {
    position: "top-right" as ToastPosition,
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "light",
  };

  return (
    <BrowserRouter>
      <ToastContainer {...props} />
      <div className="w-full h-full overflow-hidden">
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}

export default App;
