import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createExperience } from "../../redux/modules/profiles";
import { useDispatch } from "react-redux";

const AddExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createExperience(formData));
    navigate("/home");
  };

  return (
    <div
      className="main"
      style={{ textAlign: "center", width: 700, padding: 15 }}
    >
      <p className="form-title">Add Experience</p>
      <small>*= required field</small>
      <form className="form1" onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={formData.company}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={onChange}
          />
        </div>
        <div>
          <h3 style={{ marginLeft: 110, textAlign: "left" }}>From Date</h3>
          <input
            type="date"
            name="from"
            value={formData.from}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <p style={{ marginLeft: 110, textAlign: "left", marginBottom: 20 }}>
            <input
              type="checkbox"
              name="current"
              checked={formData.current}
              onChange={() =>
                setFormData({
                  ...formData,
                  current: !formData.current,
                })
              }
            />{" "}
            Current Job
          </p>
        </div>
        <div>
          <h3 style={{ marginLeft: 110, textAlign: "left" }}>To Date</h3>
          <input
            type="date"
            name="to"
            value={formData.to}
            onChange={onChange}
            disabled={formData.current}
          />
        </div>
        <div>
          <textarea
            placeholder="Job Description"
            name="description"
            value={formData.description}
            onChange={onChange}
            rows={4}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Submit" />
        <Link className="btn btn-light" to="/home" style={{ marginLeft: 10 }}>
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default AddExperience;
