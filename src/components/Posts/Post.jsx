import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PostItem from "./PostItem";
import { getPost } from "../../redux/modules/posts";
import { useSelector, useDispatch } from "react-redux";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

const Post = () => {
  const dispatch = useDispatch();
  const { post, loading } = useSelector((state) => state.posts);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, getPost, id]);

  if (loading || !post || post._id !== id) {
    return (
      <div className="home">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="home">
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        {post.comments.map((comment) => (
          <CommentItem comment={comment} postId={post._id} key={comment._id} />
        ))}
      </div>
    </div>
  );
};

export default Post;
