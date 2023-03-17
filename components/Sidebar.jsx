import { getSession } from 'next-auth/react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {AiTwotoneHome, AiOutlineSearch, AiFillRead, AiTwotoneFilter, AiOutlineLogin, AiOutlineLogout, AiFillHome} from "react-icons/ai"

export const Sidebar = () => {
    const [active, setActive] = useState(null);
    
    const [session, setSession] = useState(false);

    const handleActive = (name) => setActive(name)

    const renderNavs = () => navs.map(item => <RenderNav key={item.name} item={item} handleActive={handleActive} active={active} session={session} />)

    const getUserSession = () => {
        getSession().then(data => setSession(data?.user)).catch(err => console.log(err))
    }

    useEffect(() => {
        handleActive("Home")
        getUserSession()
    }, [])

    return (
        <nav className='flex flex-col' style={{ minWidth: "220px" }}>
            {renderNavs()}
        </nav>
    )
}

const RenderNav = ({ item, handleActive, active, session }) => {
    const { name, path, icon } = item

    return (
        ((session?.name && name !== "Login") || (!session?.name && name !== "Logout" && !session?.name && name !== "Presaved Filters"))
        ?
        <Link onClick={() => handleActive(name)} href={`${path}`} className={`flex items-center gap-1 ${active === name ? "bg-blue-400" : "bg-slate-200"} rounded-lg px-2 text-2xl my-1 hover:bg-blue-400`}>
            <span>{icon}</span>
            <span>{name}</span>
        </Link>
        : null
    )
}

const navs = [
    {
        name: "Home",
        path: "/",
        icon: <AiTwotoneHome />
    },
    {
        name: "Search News",
        path: "/search",
        icon: <AiOutlineSearch />
    },
    {
        name: "News Archive",
        path: "/archive",
        icon: <AiFillRead />
    },
    // {
    //     name: "News Outlets",
    //     path: "/outlets",
    //     icon: null
    // },
    {
        name: "Presaved Filters",
        path: "/presaved",
        icon: <AiTwotoneFilter />
    },
    // {
    //     name: "Add Outlets",
    //     path: "/outlets",
    //     icon: null
    // },
    // {
    //     name: "Outlets List",
    //     path: "/outlets",
    //     icon: null
    // },
    {
        name: "Login",
        path: "/api/auth/signin",
        icon: <AiOutlineLogin />
    },
    {
        name: "Logout",
        path: "/api/auth/signout",
        icon: <AiOutlineLogout />
    }
]
