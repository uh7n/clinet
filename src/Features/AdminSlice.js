import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Admin login async action
export const getAdmin = createAsyncThunk("administration/getAdmin", async (adminData) => {
    try {
      const response = await axios.post("https://server-euce.onrender.com/AdminLogin", {
        email: adminData.email,
        password: adminData.password,
      });

      return response.data.Admins;
    } catch (error) {
      alert("Invalid Credentials: " + error);
      throw error;
    }
  }
);

// Admin logout async action
export const Logout = createAsyncThunk("administration/Logout", async () => {
    try {
      const response = await axios.post("https://server-euce.onrender.com/Logout");
      return response.data;
    } catch (error) {
      alert("Logout Error: " + error);
      throw error;
    }
  }
);

const initialValues = {
  Admins: {},
  message: "",
  isLoading: false,
  isSucces: false,
  isError: false,
};

export const AdminSlice = createSlice({
  name: "administration",
  initialState: initialValues,
  reducers: {},
  extraReducers: (builder) => {
    // Handle getAdmin action
    builder
      .addCase(getAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.Admins = action.payload;
      })
      .addCase(getAdmin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.Admins = {}; 
      })

      // Handle Logout action
      .addCase(Logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(Logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSucces = true;
        state.Admins = {};
      })
      .addCase(Logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default AdminSlice.reducer;
