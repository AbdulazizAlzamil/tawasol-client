import { useEffect, useState } from "react";
import { addComment, getPost } from "../../redux/modules/posts";
import { useDispatch } from "react-redux";

const CommentForm = ({ postId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment({ id: postId, formData: { text: text.trim() } }));
    setText("");
  };

  return (
    <div className="post-card">
      <p className="form-title center">Leave a comment</p>
      <hr />
      <form onSubmit={onSubmit}>
        <div>
          <textarea
            placeholder="Enter your comment"
            name="text"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>
        <input type="submit" value="Comment" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default CommentForm;
