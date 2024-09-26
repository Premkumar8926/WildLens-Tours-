import React from 'react'

const UsersCard = ({user}) => {
    return (
        <div className="user-details">
            <h4 className='d-flex align-items-center'><i className='bx bxs-user' ></i>{user.firstName + " " + user.lastName}</h4>
            <h6 className='d-flex align-items-center'><i className='bx bxs-envelope' ></i>{user.email}</h6>
            {/* <button className='custom-btn'>Contact</button> */}
        </div>
    )
}

export default UsersCard