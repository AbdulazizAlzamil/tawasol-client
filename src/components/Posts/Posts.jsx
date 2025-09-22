import { useEffect } from "react";
import { getPosts } from "../../redux/modules/posts";
import { useDispatch, useSelector } from "react-redux";
import PostForm from "./PostForm";
import PostItem from "./PostItem";

const Posts = () => {
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [getPosts, posts, dispatch]);

  return (
    <div className="home">
      <div>
        <PostForm />
        <div>{posts.map(post => {
          return (
            <PostItem showActions={true} key={post._id} post={post} />
          )
        })}</div>
      </div>
    </div>
  );
};

export default Posts;
