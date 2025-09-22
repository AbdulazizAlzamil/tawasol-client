import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfiles } from "../redux/modules/profiles";
import { setAuthToken } from "../utils";
import { getProfileImageUrl } from "../utils";
import defaultImge from "../assets/default.png";
import { useDispatch, useSelector } from "react-redux";

const Developers = () => {
  const dispatch = useDispatch();
  const { profiles, loading } = useSelector((state) => state.profiles);
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user) {
      dispatch(getProfiles());
    }
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="home">
        <p>Loading...</p>
      </div>
    );
  }
  if (!loading && (!profiles || profiles.length === 0)) {
    return (
      <div className="home">
        <p>No developers found.</p>
      </div>
    );
  }
  return (
    <div className="home">
      <div className="row">
        {profiles
          .filter((profile) => profile.user._id !== user._id)
          .map((profile) => (
            <div className="column" key={profile.user._id}>
              <Developer profile={profile} />
            </div>
          ))}
      </div>
    </div>
  );
};

const Developer = ({ profile }) => {
  const userId = profile.user && profile.user._id;
  const imageUrl = userId ? getProfileImageUrl(userId) : defaultImge;
  const handleError = (e) => {
    e.target.src = defaultImge;
  };
  return (
    <Link to={`/profiles/${profile.user._id}`}>
      <div className="card">
        <img src={imageUrl} alt={profile.user.name} onError={handleError} />
        <div className="card-container">
          <p>{profile.user.name}</p>
          <p className="title">{profile.status}</p>
        </div>
      </div>
    </Link>
  );
};

export default Developers;
