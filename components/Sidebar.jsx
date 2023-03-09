import Link from 'next/link'
import React from 'react'
import { GoHome, GoHeart, GoCloudDownload, GoPlay, GoSignIn, GoSignOut } from "react-icons/go"
import { useSession } from "next-auth/react"

export const SidebarNavs = () => {
    const { data: session, status } = useSession()
    console.log(session, status)

    const renderNavs = () => navs.map(item => <RenderNav key={item.name} item={item} session={session} status={status} />)

    return (
        <nav>
            {renderNavs()}
        </nav>
    )
}

const RenderNav = ({ item, session, status }) => {
    return (
        !session?.user && status === "unauthenticated" && (item.name === "Wishlist" || item.name === "Favourites" || item.name === "Sign Out" || item.name === "Genres")
            ?
            null
            :
            session?.user && status === "authenticated" && (item.name === "Sign In")
                ?
                null
                :
                <div>
                    <Link href={item.path}>
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                    </Link>
                </div>
        // : null
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
    },
    {
        name: "Genres",
        path: "/genres",
        icon: <GoPlay />
    },
    {
        name: "Sign In",
        path: "/api/auth/signin",
        icon: <GoSignIn />
    },
    {
        name: "Sign Out",
        path: "/api/auth/signout",
        icon: <GoSignOut />
    }
]