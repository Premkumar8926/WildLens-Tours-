import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState: {
        datas: {
            users:[]
        },
        isLoading:false
    },
    reducers: {
        setDatas: (state, action) => {
            state.datas = {...action.payload}
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const { setDatas,setLoading } = dashboardSlice.actions;
export default dashboardSlice.reducer;