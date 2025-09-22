import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils";
import { showAlertMessage } from "./alerts";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/posts");
      return res.data;
    } catch (err) {
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

export const getPost = createAsyncThunk(
  "posts/getPost",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/posts/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

export const addLike = createAsyncThunk(
  "posts/addLike",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.put(`/posts/like/${id}`);
      return { id, likes: res.data };
    } catch (err) {
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

export const removeLike = createAsyncThunk(
  "posts/removeLike",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.put(`/posts/unlike/${id}`);
      return { id, likes: res.data };
    } catch (err) {
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      await api.delete(`/posts/${id}`);
      dispatch(showAlertMessage({ msg: "Post removed", type: "success" }));
      return id;
    } catch (err) {
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

export const addPost = createAsyncThunk(
  "posts/addPost",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post("/posts", formData);
      dispatch(showAlertMessage({ msg: "Post created", type: "success" }));
      return res.data;
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(showAlertMessage({ msg: error.msg, type: "error" }));
        });
      }
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ id, formData }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.post(`/posts/${id}/comments`, formData);
      dispatch(showAlertMessage({ msg: "Comment added", type: "success" }));
      return { id, comments: res.data };
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(showAlertMessage({ msg: error.msg, type: "error" }));
        });
      }
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async ({ postId, commentId }, { rejectWithValue, dispatch }) => {
    try {
      const res = await api.delete(`/posts/${postId}/comments/${commentId}`);
      dispatch(showAlertMessage({ msg: "Comment removed", type: "success" }));
      return { id: postId, comments: res.data };
    } catch (err) {
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
        state.error = {};
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.posts = [];
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload;
        state.loading = false;
        state.error = {};
      })
      .addCase(getPost.rejected, (state, action) => {
        state.post = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
        state.loading = false;
        state.error = {};
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        state.loading = false;
        state.error = {};
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        const { id, likes } = action.payload;
        const post = state.posts.find((post) => post._id === id);
        if (post) {
          post.likes = likes;
        }
        if (state.post && state.post._id === id) {
          state.post.likes = likes;
        }
        state.loading = false;
        state.error = {};
      })
      .addCase(addLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeLike.fulfilled, (state, action) => {
        const { id, likes } = action.payload;
        const post = state.posts.find((post) => post._id === id);
        if (post) {
          post.likes = likes;
        }
        if (state.post && state.post._id === id) {
          state.post.likes = likes;
        }
        state.loading = false;
        state.error = {};
      })
      .addCase(removeLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        const { id, comments } = action.payload;
        const post = state.posts.find((post) => post._id === id);
        if (post) {
          post.comments = comments;
        }
        if (state.post && state.post._id === id) {
          state.post.comments = comments;
        }
        state.loading = false;
        state.error = {};
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        const { id, comments } = action.payload;
        const post = state.posts.find((post) => post._id === id);
        if (post) {
          post.comments = comments;
        }
        if (state.post && state.post._id === id) {
          state.post.comments = comments;
        }
        state.loading = false;
        state.error = {};
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default postsSlice.reducer;
