import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TourCard from './TourCard';
import Footer from './../Layouts/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { filterTours, filterToursBySearch, resetFilteredTours } from '../../Slices/TourSlice';

const AllToursDetails = () => {
    const navigate = useNavigate();
    const { tours, filteredTours } = useSelector(state => state.tour);
    const [searchText, setSearchText] = useState('');

    const dispatch = useDispatch();

    const extractUniqueValues = (key) => tours ? [...new Set(tours.map(tour => tour[key]))] : [];

    const filteredPrices = extractUniqueValues('price');
    const filteredCountries = extractUniqueValues('country');
    const filteredSchedules = extractUniqueValues('duration');

    const [selectedPrice, setSelectedPrice] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedSchedule, setSelectedSchedule] = useState('');

    const handleSelectChange = (event, filterType) => {
        const value = event.target.value;

        if (filterType === 'price') {
            setSelectedPrice(value);
            setSelectedLocation('');
            setSelectedSchedule("");
            value === "all" ? dispatch(filterTours(value)) : dispatch(filterTours(Number(value)))
        } else if (filterType === 'location') {
            setSelectedLocation(value);
            setSelectedPrice("");
            setSelectedSchedule("");
            dispatch(filterTours(value));
        } else if (filterType === 'duration') {
            setSelectedSchedule(value);
            setSelectedPrice("");
            setSelectedLocation("");
            dispatch(filterTours(value));
        }
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        dispatch(filterToursBySearch(e.target.value));
    };

    useEffect(() => {
        dispatch(resetFilteredTours());
        window.scrollTo(0, 0); // Scroll to top when component mounts
    }, [dispatch]);

    if (!tours || tours.length === 0) {
        // Show a loading spinner or a message while tours data is being loaded
        return <div>Loading tours...</div>;
    }

    return (
        <>
            <div className='header'>
                <div className="container inner-header">
                    <div className="logo">
                        <h1 className='d-flex align-items-center'><i className='bx bxs-leaf mx-2'></i>WildLens Tours</h1>
                    </div>
                    <button className='return-btn' onClick={() => navigate("/")}><i className='bx bxs-chevrons-left'></i>Back</button>
                </div>
            </div>

            <div className="search-bar container d-flex justify-content-center mt-2">
                <div className="input-container w-75">
                    <i className='bx bx-search-alt-2' ></i>
                    <input type="text"
                        placeholder='Search by tour name'
                        value={searchText}
                        onChange={handleSearch}
                    />
                </div>
            </div>

            <div className="filter-container container">
                <select
                    className='filter'
                    value={selectedLocation}
                    onChange={(e) => handleSelectChange(e, "location")}
                >
                    <option value="all">Location</option>
                    {filteredCountries.map(filteredCountry => (
                        <option key={filteredCountry} value={filteredCountry}>{filteredCountry}</option>
                    ))}
                </select>

                <select
                    className='filter'
                    value={selectedPrice}
                    onChange={(e) => handleSelectChange(e, "price")}
                >
                    <option value="all">Budget</option>
                    {filteredPrices.map(filteredPrice => (
                        <option key={filteredPrice} value={filteredPrice}>₹ {filteredPrice}</option>
                    ))}
                </select>

                <select
                    className='filter'
                    value={selectedSchedule}
                    onChange={(e) => handleSelectChange(e, "duration")}
                >
                    <option value="all">Schedules</option>
                    {filteredSchedules.map(filteredSchedule => (
                        <option key={filteredSchedule} value={filteredSchedule}>{filteredSchedule}</option>
                    ))}
                </select>
            </div>

            <div className="tours container mb-3">
                <div className="row justify-content-center">
                    {filteredTours.length > 0 ? (
                        filteredTours.map(filteredTour => (
                            <div key={filteredTour.id} className="col-xl-4 col-12 col-lg-4 col-md-6 col-sm-6">
                                <TourCard tour={filteredTour} />
                            </div>
                        ))
                    ) : (
                        <h3>No tours exist based on your search</h3>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllToursDetails;
