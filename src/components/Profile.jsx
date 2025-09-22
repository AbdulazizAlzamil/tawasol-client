import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import defaultImage from "../assets/default.png";
import { getProfileImageUrl } from "../utils";
import { getProfileById } from "../redux/modules/profiles";
import BasicInfo from "./ProfileInfo/BasicInfo";
import Education from "./ProfileInfo/Education";
import Experience from "./ProfileInfo/Experience";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profiles);
  const { isAuthenticated } = useSelector((state) => state.users);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfileById(id));
    }
  }, [dispatch, isAuthenticated, id]);

  const handleError = (e) => {
    e.target.src = defaultImage;
  };

  if (loading) {
    return (
      <div className="home">
        <p style={{ padding: "10px" }}>Loading...</p>
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
                src={getProfileImageUrl(id) || defaultImage}
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
              </div>
              <Education profile={profile} />
            </div>
            <div className="home-column">
              <div className="home-row">
                <div className="home-column">
                  <h3>Experience</h3>
                </div>
              </div>
              <Experience profile={profile} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
