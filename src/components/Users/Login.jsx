import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../redux/modules/users";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/home");
  }, [isAuthenticated, navigate]);

  return (
    <div className="main login">
      <p className="form-title" align="center">
        Sign In
      </p>
      <form className="form1" onSubmit={onSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          align="center"
          value={email}
          onChange={onChange}
          className="input-text"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          align="center"
          value={password}
          onChange={onChange}
          className="input-text"
          required
        />
        <input
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "36%" }}
          align="center"
          value="Login"
        />
        <p className="forgot" align="center">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
