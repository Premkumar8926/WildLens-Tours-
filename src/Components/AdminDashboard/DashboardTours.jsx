import React from 'react'
import TourCard from './../Tours/TourCard';
import { useSelector } from 'react-redux';

const DashboardTours = () => {
    const { tours } = useSelector(state => state.tour);
    return (
        <>
            <div className="main">
                <div className="tours">
                    <h3>Tours</h3>
                    {/* <button className='return-btn custom'>Add Tour</button> */}
                    <div className="row mt-2">
                        {
                            tours.map(tour => (
                                <div className="col-xl-4 col-12 col-lg-4 col-md-6 col-sm-6">
                                    <TourCard key={tour.id} tour={tour} />
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardTours