import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice"
import tourReducer from "../Slices/TourSlice"
import dashboardReducer from "../Slices/DashboardSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        tour: tourReducer,
        dashboard:dashboardReducer
    }
})

export default store;