import React from 'react'

function User({ user }) {
    return (
        <>
            <h4>{user.name}</h4>
            <h4>{user.email}</h4>
        </>
    )
}

export default User