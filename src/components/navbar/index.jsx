import Link from 'next/link'
import React from 'react'
import { AiOutlineSearch, AiOutlineLogin, AiOutlineLogout, AiOutlineDashboard, AiOutlineHome, AiOutlineRise, AiOutlineDeploymentUnit } from "react-icons/ai"

export const Navbar = () => {
    const renderNavs = () => navs.map(item => <RenderNav key={item.name} item={item} />)

    return (
        <nav className='flex flex-col gap-1'>
            {renderNavs()}
        </nav>
    )
}

const RenderNav = ({ item }) => {
    const { name, path, icon } = item;

    return (
        <Link href={path} className="text-2xl bg-zinc-400 p-2 pr-11 flex gap-2 items-center rounded-lg">
            <span>{name}</span>
            <span>{icon}</span>
        </Link>
    )
}

const navs = [
    {
        name: "Home",
        path: "/",
        icon: <AiOutlineHome />
    },
    {
        name: "Top Tracks",
        path: "/top-tracks",
        icon: <AiOutlineRise />
    },
    {
        name: "Playlists",
        path: "/playlists",
        icon: <AiOutlineDeploymentUnit />
    },
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <AiOutlineDashboard />
    },
    {
        name: "Search",
        path: "/search",
        icon: <AiOutlineSearch />
    },
    {
        name: "Sign In",
        path: "/api/auth/signin",
        icon: <AiOutlineLogin />
    },
    {
        name: "Sign Out",
        path: "/api/auth/signout",
        icon: <AiOutlineLogout />
    }
]