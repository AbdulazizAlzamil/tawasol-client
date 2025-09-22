import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import defaultImage from "../assets/default.png";
import { getProfileImageUrl } from "../utils";
import {
  deleteEducation,
  deleteExperience,
  getProfile,
} from "../redux/modules/profiles";
import BasicInfo from "./ProfileInfo/BasicInfo";
import Education from "./ProfileInfo/Education";
import Experience from "./ProfileInfo/Experience";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile, loading } = useSelector((state) => state.profiles);
  const {
    user,
    isAuthenticated,
    loading: userLoading,
  } = useSelector((state) => state.users);

  useEffect(() => {
    if (user) {
      dispatch(getProfile());
    }
  }, [user, profile, dispatch]);

  useEffect(() => {
    if (!isAuthenticated && !userLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate, userLoading]);

  const handleError = (e) => {
    e.target.src = defaultImage;
  };

  if (userLoading) {
    return (
      <div className="home">
        <p style={{ padding: "10px" }}>Loading...</p>
      </div>
    );
  }

  const handleDeleteEducation = (educationId) => {
    dispatch(deleteEducation(educationId));
  };

  const handleDeleteExperience = (experienceId) => {
    dispatch(deleteExperience(experienceId));
  };

  if (!loading && !profile) {
    return (
      <div className="home">
        <p style={{ padding: "10px" }}>Please create a profile</p>
        <Link to="/create-profile" className="btn btn-primary">
          Create Profile
        </Link>
      </div>
    );
  }

  return (
    <div className="home">
      {profile && (
        <div>
          <div className="home-row">
            <div className="home-column" style={{ textAlign: "center" }}>
              <img
                src={
                  user && user._id ? getProfileImageUrl(user._id) : defaultImage
                }
                alt="profile"
                className="profile-picture"
                onError={handleError}
              />
            </div>
            <div className="home-column" style={{ textAlign: "center" }}>
              <BasicInfo profile={profile} />
              <div className="social">
                {profile.social &&
                  Object.keys(profile.social)
                    .filter((media) => profile.social[media])
                    .map((media) => {
                      return (
                        <a
                          key={media}
                          rel="noreferrer"
                          target="_blank"
                          href={profile.social[media]}
                        >
                          <i className={`fab fa-${media} fa-2x`}></i>
                        </a>
                      );
                    })}
              </div>
            </div>
          </div>
          <div className="home-row">
            <div className="home-column">
              <div className="home-row">
                <div className="home-column">
                  <h3>Education</h3>
                </div>
                <div className="home-column">
                  <Link to="/add-education" className="add-button">
                    <i className="fa fa-plus-circle fa-2x"></i>
                  </Link>
                </div>
              </div>
              <Education
                profile={profile}
                deleteEducation={handleDeleteEducation}
              />
            </div>
            <div className="home-column">
              <div className="home-row">
                <div className="home-column">
                  <h3>Experience</h3>
                </div>
                <div className="home-column">
                  <Link to="/add-experience" className="add-button">
                    <i className="fa fa-plus-circle fa-2x"></i>
                  </Link>
                </div>
              </div>
              <Experience
                profile={profile}
                deleteExperience={handleDeleteExperience}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
