import React from 'react'

export const UserDetails = ({ user }) => {
    return (
        <>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
        </>
    )
}
