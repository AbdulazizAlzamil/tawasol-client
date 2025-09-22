import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  msg: "",
  type: "info",
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    showAlertMessage: (state, action) => {
      state.show = true;
      state.msg = action.payload.msg;
      state.type = action.payload.type || "info";
    },
    hideAlert: (state) => {
      state.show = false;
      state.msg = "";
      state.type = "info";
    },
  },
});

export const { showAlertMessage, hideAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
