import Link from 'next/link'
import React from 'react'

export const Sidebar = () => {
    const renderNavs = () => navs.map(item => <RenderNav key={item.name} item={item} />)
  return (
    <nav className='flex flex-col' style={{minWidth: "180px"}}>
        {renderNavs()}
    </nav>
  )
}

const RenderNav = ({item}) => {
    const {name, path, icon} = item

    return (
        <Link href={`${path}`} className="flex text-2xl my-1">
            <span>{icon}</span>
            <span>{name}</span>
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
        name: "Search News",
        path: "/search",
        icon: null
    },
    {
        name: "News Archive",
        path: "/archive",
        icon: null
    },
    {
        name: "News Outlets",
        path: "/outlets",
        icon: null
    },
    {
        name: "Presaved Filters",
        path: "/presaved",
        icon: null
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
        icon: null
    },
    {
        name: "Logout",
        path: "/api/auth/signout",
        icon: null
    }
]
