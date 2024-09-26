import React, { useEffect, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './Components/Sections/Home'
import "./App.css"
import Login from './Components/Auth/Login'
import SignUp from './Components/Auth/SignUp'
import ForgotPassword from './Components/Auth/ForgotPassword'
import AllToursDetails from './Components/Tours/AllToursDetails'
import IndividualTourDetail from './Components/Tours/IndividualTourDetail'
import Dashboard from './Components/AdminDashboard/Dashboard'
import DashboardHome from './Components/AdminDashboard/DashboardHome'
import DashboardUsers from './Components/AdminDashboard/DashboardUsers'
import DashboardMarketing from './Components/AdminDashboard/DashboardMarketing'
import DashboardTours from './Components/AdminDashboard/DashboardTours'
import DashboardBookings from './Components/AdminDashboard/DashboardBookings'
import AccountActivation from './Components/Auth/AccountActivation'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin, setToken, setUserDetails } from './Slices/AuthSlice'
import ResetPage from './Components/Auth/ResetPassword'
// import Admin from './Components/Dashboard/Admin'
import ReactLoading from 'react-loading';
import axios from 'axios'
import { setTours } from './Slices/TourSlice'
import UserProfile from './Components/Auth/UserProfile'
import PreviousBookings from './Components/Auth/PreviousBookings';
import UpcomingBookings from './Components/Auth/UpcomingBookings';
import ProtectedRoute from './Components/AdminDashboard/ProtectedRoute'
import BookTour from './Components/Tours/BookTour'
import { setDatas } from './Slices/DashboardSlice'
import DashboardMessages from './Components/AdminDashboard/DashboardMessages'



const App = () => {

  const [loading, setLoading] = useState(true);

  const { login, token, userDetails } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("isLoggedIn");
    if (isLoggedIn != null) dispatch(setLogin(isLoggedIn))

    const token = window.localStorage.getItem("token");
    if (token != null) dispatch(setToken(token))

    if (login) {
      axios.post("/booking/getuserdetails", { token }).then(res => {
        dispatch(setUserDetails(res.data.personalDetails));

      }).catch(error => {
        console.error('Error fetching user details:', error);
      });
    }

    axios.get("/tour/alltours").then(res => {
      try {
        dispatch(setTours(res.data.tours));
        setLoading(false);

      } catch (error) {
        console.log(error);
      }
    })

    if (login) {
      setLoading(true);
      axios.get("/user/dashboarddatas", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(res => {
        try {
          dispatch(setDatas(res.data.datas));
          setLoading(false);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      })
    }

  }, [login])

  const getRedirectElement = () => {
    if (login && userDetails && userDetails.user) {
      return userDetails.user.role === "admin" ? <Navigate to="/dashboard" /> : <Home />;
    }
    return <Home />;
  };


  const router = createBrowserRouter([
    {
      path: "/",
      element: getRedirectElement()
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <SignUp />
    },
    {
      path: "/myprofile",
      element: <UserProfile />,
      children: [
        {
          index: true,
          element: <PreviousBookings />
        },
        {
          path: "previousbookings",
          element: <PreviousBookings />
        },
        {
          path: "upcomingbookings",
          element: <UpcomingBookings />
        }
      ]
    },
    {
      path: "/activation/:token",
      element: <AccountActivation />
    },
    {
      path: "/forgotpassword",
      element: <ForgotPassword />
    },
    {
      path: "/resetpage/:verificationString",
      element: <ResetPage />
    },
    {
      path: "/alltours",
      element: <AllToursDetails />
    },
    {
      path: "/details",
      element: <IndividualTourDetail />
    },
    {
      path: "/dashboard",
      element: <ProtectedRoute element={<Dashboard />} role="admin" />,
      children: [
        {
          index: true,
          element: <DashboardHome />
        },
        {
          path: 'home',
          element: <DashboardHome />
        },
        {
          path: 'users',
          element: <DashboardUsers />
        },
        {
          path: 'marketing',
          element: <DashboardMarketing />
        },
        {
          path: 'tours',
          element: <DashboardTours />
        },
        {
          path: 'bookings',
          element: <DashboardBookings />
        },
        {
          path: 'messages',
          element: <DashboardMessages />
        }

      ]
    }
  ])
  return (

    <div>
      {loading ? (
        <div className="loading-container bg-white">
          <ReactLoading type="spinningBubbles" color="#3F775A" />
        </div>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  )

}

export default App