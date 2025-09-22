import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../redux/modules/users";
import { showAlertMessage } from "../../redux/modules/alerts";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(
        showAlertMessage({ msg: "Passwords do not match", type: "error" })
      );
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <div className="main register">
      <p className="form-title" align="center">
        Sign Up
      </p>
      <form className="form1" onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          align="center"
          value={name}
          onChange={onChange}
          className="input-text"
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          align="center"
          value={email}
          onChange={onChange}
          className="input-text"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          align="center"
          value={password}
          onChange={onChange}
          className="input-text"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          align="center"
          value={confirmPassword}
          onChange={onChange}
          className="input-text"
        />
        <input
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "36%" }}
          align="center"
          value="Register"
        />
        <p className="forgot" align="center">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
