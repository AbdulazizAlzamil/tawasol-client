import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { showAlertMessage } from "./alerts";
import { api, getProfileImageUrl, setAuthToken } from "../../utils";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
  image: null,
};

export const getProfile = createAsyncThunk(
  "profiles/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/profiles/me");
      return res.data;
    } catch (err) {
      rejectWithValue();
    }
  }
);

export const createProfile = createAsyncThunk(
  "profiles/createProfile",
  async ({ formData, edit = false }, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/profiles", formData);
      dispatch(
        showAlertMessage({ msg: edit ? "Profile Updated" : "Profile Created" })
      );

      return res.data;
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(showAlertMessage({ msg: error.msg, type: "error" }));
        });
      }

      return rejectWithValue();
    }
  }
);

export const uploadProfileImage = createAsyncThunk(
  "profiles/uploadProfileImage",
  async (data, { rejectWithValue, getState }) => {
    try {
      const token = getState().users.token;
      if (!token) {
        dispatch(
          showAlertMessage({
            msg: "Authentication required for image upload",
            type: "error",
          })
        );
        return rejectWithValue("No token");
      }
      setAuthToken(token);
      const res = await api.post("/profiles/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (err) {
      return rejectWithValue();
    }
  }
);

export const createEducation = createAsyncThunk(
  "profiles/createEducation",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.put("/profiles/education", formData);
      dispatch(showAlertMessage({ msg: "Education Added" }));
      return res.data;
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(showAlertMessage({ msg: error.msg, type: "error" }));
        });
      }

      return rejectWithValue();
    }
  }
);

export const deleteEducation = createAsyncThunk(
  "profiles/deleteEducation",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/profiles/education/${id}`);
      dispatch(showAlertMessage({ msg: "Education Deleted" }));
      return id;
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(showAlertMessage({ msg: error.msg, type: "error" }));
        });
      }

      return rejectWithValue();
    }
  }
);

export const createExperience = createAsyncThunk(
  "profiles/createExperience",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.put("/profiles/experience", formData);
      dispatch(showAlertMessage({ msg: "Experience Added" }));
      return res.data;
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(showAlertMessage({ msg: error.msg, type: "error" }));
        });
      }

      return rejectWithValue();
    }
  }
);

export const deleteExperience = createAsyncThunk(
  "profiles/deleteExperience",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await api.delete(`/profiles/experience/${id}`);
      dispatch(showAlertMessage({ msg: "Experience Deleted" }));
      return id;
    } catch (err) {
      const errors = err.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(showAlertMessage({ msg: error.msg, type: "error" }));
        });
      }

      return rejectWithValue();
    }
  }
);

export const getProfiles = createAsyncThunk(
  "profiles/getProfiles",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/profiles");
      return res.data;
    } catch (err) {
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

export const getProfileById = createAsyncThunk(
  "profiles/getProfileById",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/profiles/user/${userId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue({
        msg: err.response.statusText,
        status: err.response.status,
      });
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "profiles/deleteAccount",
  async (_, { rejectWithValue, dispatch }) => {
    if (window.confirm("Are you sure? This can NOT be undone!")) {
      try {
        await api.delete("/profiles");
        dispatch(
          showAlertMessage({ msg: "Your account has been permanently deleted" })
        );
      } catch (err) {
        return rejectWithValue({
          msg: err.response.statusText,
          status: err.response.status,
        });
      }
    }
  }
);

const profiles = createSlice({
  name: "profiles",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.profile = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProfiles.fulfilled, (state, action) => {
        state.profiles = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getProfiles.rejected, (state, action) => {
        state.profiles = [];
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.profile = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.image = getProfileImageUrl(action.payload);
      })
      .addCase(createEducation.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteEducation.fulfilled, (state, action) => {
        state.profile.education = state.profile.education.filter(
          (edu) => edu._id !== action.payload
        );
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.profile.experience = state.profile.experience.filter(
          (exp) => exp._id !== action.payload
        );
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.profile = null;
        state.loading = false;
        state.error = false;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.profile = null;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default profiles.reducer;
