import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to insert a new user
export const insertUser = createAsyncThunk("user/insertUser",async (userData) => {
    try {
      const response = await axios.post("https://server-euce.onrender.com/insertUser", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        image: userData.image,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Async thunk to get user data
export const getUser = createAsyncThunk("user/getUser", async (userData) => {
  try {
    const response = await axios.post("https://server-euce.onrender.com/Login", {
      email: userData.email,
      password: userData.password,
    });
    return response.data.user;
  } catch (error) {
    alert("Invalid Credentials: " + error);
    throw error;
  }
});

export const allUser = createAsyncThunk("user/allUser", async () => {
  try {
    const response = await axios.get("https://server-euce.onrender.com/allUser");
    return response.data.users;
  } catch (error) {
    console.error(error);
  }
});


// Async thunk to update user data
export const updateUser = createAsyncThunk("user/updateUser", async (userData) => {
    try {
      const response = await axios.put("https://server-euce.onrender.com/updateUser", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        image: userData.image,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// Async thunk to handle logout
export const logout = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axios.post("https://server-euce.onrender.com/logout");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});


// Delete event
export const deleteUser = createAsyncThunk(
  "Eventcount/deleteUser",
  async (eventId) => {
    try {
      const response = await axios.delete(
        `https://server-euce.onrender.com/deleteUser/${eventId}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("Payload sent to backend for resetPassword:", payload); // Debugging log

      const response = await fetch("https://server-euce.onrender.com/resetPassword", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      return await response.json(); // Parse JSON if valid
    } catch (error) {
      console.error("Error in resetPassword action:", error);
      return rejectWithValue(error.message || "An error occurred while resetting the password.");
    }
  }
);


export const updateUserName = createAsyncThunk(
  "user/updateUserName",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("Payload sent to backend:", payload); // Debugging log
      const response = await fetch("https://server-euce.onrender.com/updateUserName", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Read error message as text
        throw new Error(`Error: ${response.status} - ${errorText}`);
      }

      return await response.json(); // Parse response as JSON
    } catch (error) {
      console.error("Error in updateUserName action:", error);
      return rejectWithValue(error.message || "An error occurred.");
    }
  }
);

const initialState = {
  user: [],
  message: "",
  isLoading: false,
  isSucces: false,
  isError: false,
};

// User slice to manage state
export const UserSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling insertUser actions
    builder
      .addCase(insertUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(insertUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.message = action.payload;
      })
      .addCase(insertUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })

      

      // Handling getUser actions
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })


      .addCase(allUser.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(allUser.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSucces = true;
              state.user = action.payload; 
            })
            .addCase(allUser.rejected, (state) => {
              state.isLoading = false;
              state.isError = true;
            })



      // Handling updateUser actions
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })



      // Handling logout actions
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.message = action.payload.message;
        state.user = {};
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })


      .addCase(deleteUser.pending, (state) => {
              state.isLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
              state.isLoading = false;
              state.isSucces = true;
            })
            .addCase(deleteUser.rejected, (state) => {
              state.isLoading = false;
              state.isError = true;
            })

            // Handling resetPassword actions
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message || "Password reset successfully!";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.error.message || "Failed to reset password.";
      })


      // Handling updateUserName actions
      .addCase(updateUserName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccesss = true;
        state.user.name = action.payload.name; // Update name
        state.message = action.payload.message || "Name updated successfully!";
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to update name.";
      }) ;
  },
});

export default UserSlice.reducer;
