import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeToken } from "../../state";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(removeToken());
    navigate("/");
  };

  return (
    <div className="container max-w-full p-4">
      {location.pathname !== "/home" &&
        location.pathname !== "/" &&
        location.pathname !== "/register" && (
          <div className="flex justify-between">
            <div>
              <Link
                to="/home"
                className="mr-5 text-center max-h-12 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Home
              </Link>
            </div>
            <div>
              <Link
                to="/home"
                className="mr-5 text-center max-h-12 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Logout
              </Link>
            </div>
          </div>
        )}

      {location.pathname !== "/" &&
        location.pathname !== "/register" &&
        location.pathname === "/home" && (
          <div className="flex justify-between">
            <Link
              to="/home"
              onClick={() => window.location.reload(true)}
              className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Refresh
            </Link>
            <button
              className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
    </div>
  );
};

export default Navbar;
