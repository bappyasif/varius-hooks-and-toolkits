import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export const Sidebar = () => {
    const {data: session, status} = useSession()

    if(status === "unauthenticated") {
        options = options.filter(item => (item.name === "Home" || item.name === "Login" || item.name === "Detect"))
    } else if (status === "authenticated") {
        options = options.filter(item => item.name !== "Login")
    }

    const renderNavs = () => options.map(item => <RenderNav key={item.name} item={item} />)
    
    return (
        <nav className='flex flex-col bg-blue-200 h-screen align-middle justify-center'>
            {renderNavs()}
        </nav>
    )
}

const RenderNav = ({ item }) => {
    const { name, path, icon } = item
    return (
        <Link href={path} className="text-4xl py-2 px-16">
            <span>{icon}</span>
            <span>{name}</span>
        </Link>
    )
}


let options = [
    {
        name: "Home",
        path: "/",
        icon: null
    },
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: null
    },
    {
        name: "Search",
        path: "/search",
        icon: null
    },
    {
        name: "Detect Music",
        path: "/detect",
        icon: null
    },
    {
        name: "Favourites",
        path: "/favourites",
        icon: null
    },
    {
        name: "Playlists",
        path: "/playlists",
        icon: null
    },
    {
        name: "Login",
        path: "/api/auth/signin",
        icon: null
    },
    {
        name: "Logout",
        path: "/api/auth/signout",
        icon: null
    }
]