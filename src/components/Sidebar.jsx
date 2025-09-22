import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileImageUrl } from "../utils";
import defaultImage from "../assets/default.png";

const Sidebar = () => {
  const { user } = useSelector((state) => state.users);

  const handleError = (e) => {
    e.target.src = defaultImage;
  };

  return (
    <div>
      <div className="sidebar">
        <div>
          <Link to="/home">
            <img
              src={
                user && user._id ? getProfileImageUrl(user._id) : defaultImage
              }
              onError={handleError}
              alt="profile"
              className="profile"
            />
          </Link>
        </div>
        <Link to="/home">Home</Link>
        <Link to="/posts">Posts</Link>
        <Link to="/developers">Developers</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </div>
  );
};

export default Sidebar;
