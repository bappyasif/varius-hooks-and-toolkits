import { useSession } from 'next-auth/react';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {AiTwotoneHome, AiOutlineSearch, AiFillRead, AiTwotoneFilter, AiOutlineLogin, AiOutlineLogout, AiFillHome} from "react-icons/ai"

export const Sidebar = () => {
    const [active, setActive] = useState(null);

    const {data: session, status} = useSession()

    const handleActive = (name) => setActive(name)

    const renderNavs = () => navs.map(item => <RenderNav key={item.name} item={item} handleActive={handleActive} active={active} session={session?.user} />)

    useEffect(() => {
        handleActive("Home")
    }, [])

    return (
        <nav 
            className='flex lg:flex-col xs:mb-4 lg:mb-0' 
            style={{ 
                minWidth: "220px",
                background: `url(${"/sidebar.jpg"})`
            }}
        >
            {renderNavs()}
        </nav>
    )
}

const RenderNav = ({ item, handleActive, active, session }) => {
    const { name, path, icon } = item

    return (
        ((session?.name && name !== "Login") || (!session?.name && name !== "Logout" && !session?.name && name !== "Presaved Filters"))
        ?
        <Link 
            onClick={() => handleActive(name)} 
            href={`${path}`} 
            className={`flex xs:p-4 md:p-2 items-center gap-1 ${active === name ? "bg-blue-400" : "bg-slate-200"} rounded-lg px-2 text-2xl my-1 hover:bg-blue-400`}
        >
            <span>{icon}</span>
            <span className='min-[320px]:hidden md:block'>{name}</span>
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
    {
        name: "Presaved Filters",
        path: "/presaved",
        icon: <AiTwotoneFilter />
    },
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
