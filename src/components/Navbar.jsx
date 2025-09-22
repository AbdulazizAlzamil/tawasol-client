import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/modules/users";

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const dispatch = useDispatch();

    const links = (
      <ul>
        <li><Link to="/login">Login</Link></li>
      </ul>
    );

  const authLinks = (
    <ul>
      <li><Link onClick={() => dispatch(logout())} to="/">Logout</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-navbar">
      <h1>
        <Link className="logo-navbar" to={isAuthenticated ? "/home" : "/"}>
          TawaSol
        </Link>
      </h1>
      <Fragment>
        {isAuthenticated ? authLinks : links}
      </Fragment>
    </nav>
  );
};

export default Navbar;
