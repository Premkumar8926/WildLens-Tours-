import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: false,
        token: "",
        userDetails: {} 
    },
    reducers: {
        setLogin: (state, action) => {
            state.login = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        }
    }
})

export const { setLogin, setToken, setUserDetails } = authSlice.actions;
export default authSlice.reducer;