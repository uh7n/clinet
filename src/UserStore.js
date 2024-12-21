import { configureStore } from "@reduxjs/toolkit";
import  UserReducer  from "./Features/UserSlice";
import AdminReducer from "./Features/AdminSlice";
import EventReducer from "./Features/EventSlice";
import PostsReducer from "./Features/PostSlice";
export const store = configureStore({
    reducer:{
        counter: UserReducer,
        administration: AdminReducer,
        Eventcount: EventReducer,
        posts : PostsReducer
    },
})