import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createProfile,
  uploadProfileImage,
} from "../../redux/modules/profiles";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  company: "",
  website: "",
  location: "",
  country: "",
  status: "",
  skills: "",
  bio: "",
  twitter: "",
  facebook: "",
  linkedin: "",
  youtube: "",
  instagram: "",
  github: "",
};

const ProfileForm = () => {
  const profile = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile({ formData, edit: profile ? true : false })).then(
      (action) => {
        // If profile was created and not edited, redirect to home
        if (!profile && action.meta.requestStatus === "fulfilled") {
          navigate("/home");
        }
      }
    );
  };

  const onFileChange = (e) => {
    const data = new FormData();
    data.append("file", e.target.files[0]);
    dispatch(uploadProfileImage(data));
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="main" style={{ width: 600, textAlign: "center" }}>
      <p className="form-title">{profile ? "Edit Profile" : "Create Profile"}</p>
      <form className="form1" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={formData.status} onChange={onChange}>
            <option>* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student">Student</option>
            <option value="Instructor">Instructor</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input type="file" onChange={onFileChange} />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={formData.company}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={formData.website}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Country"
            name="country"
            value={formData.country}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Skills"
            name="skills"
            value={formData.skills}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <textarea
            type="text"
            placeholder="A short bio of yourself"
            name="bio"
            value={formData.bio}
            onChange={onChange}
          />
        </div>

        <div>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => toggleSocialInputs((prev) => !prev)}
          >
            Social Networks
          </button>
        </div>

        {displaySocialInputs ? (
          <>
            <div>
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={formData.twitter}
                onChange={onChange}
              />
            </div>
            <div>
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={formData.facebook}
                onChange={onChange}
              />
            </div>
            <div>
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="LinkedIn URL"
                name="linkedin"
                value={formData.linkedin}
                onChange={onChange}
              />
            </div>
            <div>
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={formData.youtube}
                onChange={onChange}
              />
            </div>
            <div>
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={formData.instagram}
                onChange={onChange}
              />
            </div>
            <div>
              <i className="fab fa-github fa-2x" />
              <input
                type="text"
                placeholder="GitHub URL"
                name="github"
                value={formData.github}
                onChange={onChange}
              />
            </div>
          </>
        ) : (
          <></>
        )}

        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default ProfileForm;
