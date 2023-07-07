import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const Layout = () => {
    return (
        <>
            <Header />
            <main className='App'>
                {/* outlet will have all of app's children */}
                <Outlet />
            </main>
        </>
    )
}

export default Layout