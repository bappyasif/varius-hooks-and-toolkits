import Link from 'next/link'
import React from 'react'
import { GoHome, GoHeart, GoCloudDownload, GoPlay, GoSignIn, GoSignOut } from "react-icons/go"
import { useSession } from "next-auth/react"

export const SidebarNavs = () => {
    const { data: session, status } = useSession()
    console.log(session, status)

    const renderNavs = () => navs.map(item => <RenderNav key={item.name} item={item} session={session} status={status} />)

    return (
        <nav 
            style={{maxWidth: "29vw", minWidth: "fit-content"}}
            className='w-3/4 flex flex-col justify-center bg-neutral-400 items-center'
        >
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
                <Link className='text-4xl flex gap-8 items-center my-4 hover:text-indigo-600 justify-between' href={item.path}>
                    <span style={{width: "60px"}}>{item.icon}</span>
                    <span style={{width: "150px"}}>{item.name}</span>
                </Link>
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