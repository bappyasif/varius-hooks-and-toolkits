import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
    const renderNavs = () => navs.map(item => <RenderNav key={item.name} item={item} />)

  return (
    <nav className='flex flex-col gap-4'>
        {renderNavs()}
    </nav>
  )
}

const RenderNav = ({item}) => {
    const {name, path, icon} = item;

    return (
        <Link href={path} className="text-xl bg-zinc-400 p-2">
            <span>{name}</span>
            <span>{icon}</span>
        </Link>
    )
}

const navs = [
    {
        name: "Home",
        path: "/",
        icon: null
    },
    {
        name: "Playlists",
        path: "/playlists",
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
        name: "Sign In",
        path: "/api/auth/signin",
        icon: null
    },
    {
        name: "Sign Out",
        path: "/api/auth/signout",
        icon: null
    }
]