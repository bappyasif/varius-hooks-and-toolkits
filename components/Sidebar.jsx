import Link from 'next/link'
import React from 'react'

export const Sidebar = () => {
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


const options = [
    {
        name: "Home",
        path: "/",
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
    }
]