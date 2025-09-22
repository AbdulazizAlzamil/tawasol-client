import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createEducation } from "../../redux/modules/profiles";
import { useDispatch } from "react-redux";

const AddEducation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
  });

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createEducation(formData));
    navigate("/home");
  };

  return (
    <div
      className="main"
      style={{ textAlign: "center", width: 700, padding: 15 }}
    >
      <p className="form-title">Add Education</p>
      <small>*= required field</small>
      <form className="form1" onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            placeholder="* School"
            name="school"
            value={formData.school}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={formData.degree}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
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
            Current School
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
        <input type="submit" className="btn btn-primary" value="Submit" />
        <Link className="btn btn-light" to="/home" style={{ marginLeft: 10 }}>
          Go Back
        </Link>
      </form>
    </div>
  );
};

export default AddEducation;
