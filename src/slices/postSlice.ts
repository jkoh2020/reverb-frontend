import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PostModel } from '../models/postModel';
import { createPost, getAllPosts } from "../remote/reverb-api/post.api";
import { store } from "../app/store";


export type PostState = PostModel[];

const initialState: PostState = [];

export const getPostsAsync = createAsyncThunk<PostModel[], object>(
    'post/get/async',
    async (nothing, thunkAPI) => {
        try {
            return await getAllPosts();
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const postPostAsync = createAsyncThunk<PostModel, PostModel>(
    'post/post/async',
    async (neoPost: PostModel, thunkAPI) => {
        try {
            return await createPost(neoPost);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

const postSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
        .addCase(getPostsAsync.pending, (state) => {
            // do nothing
        })
        .addCase(postPostAsync.pending, (state) => {
            // do nothing
        })
        .addCase(getPostsAsync.fulfilled, (state, action) => {
            return action.payload;
        })
        .addCase(postPostAsync.fulfilled, (state, action) => {
            // state.push(action.payload);
        })
        .addCase(getPostsAsync.rejected, (state, action) => {
            // console.log(action.error);
        })
        .addCase(postPostAsync.rejected, (state, action) => {
            // console.log(action.error);
        })
    }
});

type Rootstate = ReturnType<typeof store.getState>;
export const selectPosts = (state: Rootstate) => {
    return state.posts
}

export default postSlice.reducer;