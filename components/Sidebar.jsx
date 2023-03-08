import Link from 'next/link'
import React from 'react'
import { GoHome, GoHeart, GoCloudDownload } from "react-icons/go"

export const SidebarNavs = () => {
    const renderNavs = () => navs.map(item => <RenderNav key={item.name} item={item} />)
    return (
        <nav>
            {renderNavs()}
        </nav>
    )
}

const RenderNav = ({ item }) => {
    return (
        <div>
            <Link href={item.path}>
                <span>{item.icon}</span>
                <span>{item.name}</span>
            </Link>
        </div>
    )
}


const navs = [
    {
        name: "Home",
        path: "/",
        icon: <GoHome />
    },
    {
        name: "Wishlist",
        path: "/wishlist",
        icon: <GoCloudDownload />
    },
    {
        name: "Favourites",
        path: "/favourites",
        icon: <GoHeart />
    }
]