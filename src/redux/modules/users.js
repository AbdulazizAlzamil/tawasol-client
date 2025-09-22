import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, setAuthToken } from "../../utils";
import { showAlertMessage } from "./alerts";
import { getProfile } from "./profiles";

const initialState = {
  token: null,
  isAuthenticated: null,
  loading: true,
  user: null,
};

export const loadUser = createAsyncThunk(
  "users/loadUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users");
      return res.data;
    } catch (err) {
      setAuthToken();
      return rejectWithValue();
    }
  }
);

export const register = createAsyncThunk(
  "users/register",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/users/register", formData);
      setAuthToken(res.data.token);
      dispatch(loadUser());
      return res.data;
    } catch (err) {
      setAuthToken();
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

export const login = createAsyncThunk(
  "users/login",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("/users/login", formData);
      setAuthToken(res.data.token);
      dispatch(loadUser());
      dispatch(getProfile());
      return res.data;
    } catch (err) {
      setAuthToken();
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

export const logout = createAsyncThunk(
  "users/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      setAuthToken(); // This will clear the token from cookies and axios headers
      dispatch(
        showAlertMessage({ msg: "Logged out successfully", type: "success" })
      );
      return true;
    } catch (err) {
      setAuthToken();
      const errors = err?.response?.data?.errors;
      if (errors) {
        errors.forEach((error) => {
          dispatch(showAlertMessage({ msg: error.msg, type: "error" }));
        });
      }
      return rejectWithValue();
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setLoadingFalseIfNoToken: (state) => {
      if (!state.token) {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loadUser.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(register.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.user = null;
      });
  },
});

export default usersSlice.reducer;
