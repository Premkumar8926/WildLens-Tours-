import React from 'react'
import { useSelector } from 'react-redux';

const DashboardHome = () => {
    const { datas } = useSelector(state => state.dashboard);
    return (
        <>
            <div className="main">

                <div className="cards">
                    <div className="card-details">
                        <h4 >Total user's</h4>
                        <h5>{datas.totalUser}</h5>
                    </div>

                    <div className="card-details">
                        <h4 >Total booking's</h4>
                        <h5>{datas.totalBookings}</h5>
                    </div>

                    <div className="card-details">
                        <h4 >Tour's completed</h4>
                        <h5>{datas.completedTours}</h5>
                    </div>

                    <div className="card-details">
                        <h4 >Upcoming tour's</h4>
                        <h5>{datas.pendingTours}</h5>
                    </div>
                </div>

            </div>
        </>
    )
}

export default DashboardHome