import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAccount } from "../redux/modules/profiles";

const Settings = () => {
  const dispatch = useDispatch();
  return (
    <div className="home">
      <div className="post-card center">
        <div style={{ marginBottom: 15 }}>
          <p>Update your profile inforamtion.</p>
        </div>
        <div style={{ marginBottom: 15 }}>
          <Link to="/edit-profile" className="btn btn-primary">
            Edit Account
          </Link>
        </div>
      </div>
      <div className="post-card center">
        <div>
          <p>
            This will completely delete your account and remove your data from
            TawSol.
          </p>
        </div>
        <div>
          <button
            className="btn btn-danger"
            onClick={() => dispatch(deleteAccount())}
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
