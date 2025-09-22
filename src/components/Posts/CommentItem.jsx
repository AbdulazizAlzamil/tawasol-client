import { deleteComment } from "../../redux/modules/posts";
import { formatDate, getProfileImageUrl } from "../../utils";
import { useDispatch, useSelector } from "react-redux";

const CommentItem = ({ comment, postId }) => {
  const dispatch = useDispatch();
  const { user: authUser, loading } = useSelector((state) => state.users);

  return (
    <div className="post-card">
      <div className="row">
        <div className="column">
          <img
            className="profile"
            src={getProfileImageUrl(comment.user)}
            alt="profile"
          />
          <p>{comment.name}</p>
        </div>
        <div
          className="column"
          style={{ width: "75%", textAlign: "left", marginTop: 10 }}
        >
          <p>{comment.text}</p>
          <small style={{ color: "gray" }}>
            Commented at {formatDate(comment.date)}
          </small>
          {!loading && comment.user === authUser._id && (
            <button
              type="button"
              className="btn btn-light"
              onClick={() => dispatch(deleteComment({postId, commentId: comment._id}))}
            >
              <i className="fas fa-trash"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
