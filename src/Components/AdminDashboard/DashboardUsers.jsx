import React from 'react'
import UsersCard from './UsersCard'
import { useSelector } from 'react-redux';

const DashboardUsers = () => {
    const { datas } = useSelector(state => state.dashboard);
    return (
        <>
            <div className="main">

                <div className="cards">
                    {
                        datas.users.map(user => (
                            <UsersCard user={user}/>
                        ))
                    }
                </div>

            </div>
        </>
    )
}

export default DashboardUsers