import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const savePost = createAsyncThunk("posts/savePost", async (postData) => {
    try {
        const response = await axios.post("https://server-euce.onrender.com/savePost", {
          postMsg:postData.postMsg,
          email:postData.email,
          rating:postData.rating, 
        });
        const post = response.data.post;
        return post;
    } catch (error) {
      console.log(error);
    }
  });

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
    try {
        const response = await axios.get("https://server-euce.onrender.com/getPosts");
        return response.data.posts;
    } catch (error) {
      console.log(error)
    }
  });  

const initialValues = {
    posts:[],
    lokes:[],
    statue:'idle',
    isLoading:false,
    isSucces:false,
    isError:false
  };



  export const PostSlice = createSlice({
    name: "posts",
    initialState: initialValues,
    reducers: {},
    extraReducers:(builder)=>{
      builder.addCase(savePost.pending,(state)=>{
              state.isLoading=true;
              })
             .addCase(savePost.fulfilled,(state,action)=>{
              state.isLoading=false;
              state.isSucces=true;
             })
             .addCase(savePost.rejected,(state)=>{
              state.isLoading=false;
              state.isError=true;
             })

             
             .addCase(getPosts.pending,(state)=>{
              state.isLoading=true;
              })
             .addCase(getPosts.fulfilled,(state,action)=>{
              state.isLoading=false;
              state.isSucces=true;
              state.posts=action.payload;
             })
             .addCase(getPosts.rejected,(state)=>{
              state.isLoading=false;
              state.isError=true;
             })
    }
  });
  
  
  export default PostSlice.reducer;
