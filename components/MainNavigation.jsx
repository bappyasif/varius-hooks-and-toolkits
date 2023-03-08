import Link from "next/link"
import Image from "next/image"
// import { Navbar } from "flowbite-react"
import img from "@/public/sundarban.jpg"
import {FaSearch} from "react-icons/fa"

export const MainNavigation = () => {
    return (
        <div >
            <Image className="min-w-full max-h-72" src={img} alt="a picture of sundarban" height={240} />
            <OnlyNavs />
        </div>
    )
}

const OnlyNavs = () => {
    return (
        <div className="flex flex-row justify-between bg-gray-400">
            {/* <SidebarNavigation /> */}
            <BrandView />
            <SearchView />
            <TopNavigation />
        </div>
    )
}

const BrandView = () => {
    return (
        <h1 className="min-w-fit py-1 self-end px-4">Welcome To Your Portal</h1>
    )
}

const SearchView = () => {
    return (
        <section className="bg-blue-400 flex flex-row justify-between py-3 px-6 gap-4 self-start items-center rounded-sm">
            <FaSearch className="text-4xl" />
            <input className="bg-inherit text-4xl outline-double rounded-sm" placeholder="search your movie here" />
        </section>
    )
}

export const SidebarNavigation = () => {
    const renderNavs = () => navs.map(item => <RenderNavElement key={item.name} item={item} />)
    return (
        <div className="bg-purple-900 w-1/4 rounded-sm min-h-max">
            <ul className="">
                {renderNavs()}
            </ul>
        </div>
    )
}

const TopNavigation = () => {
    const renderNavs = () => navs.map(item => <RenderNavElement key={item.name} item={item} />)
    return (
        <nav className="bg-slate-400 px-4 py-1 self-start">
            <ul className="flex flex-row w-full">
                {renderNavs()}
            </ul>
        </nav>
    )
}

export const RenderNavElement = ({ item }) => {
    return (
        <li className=" bg-gray-200 px-4 py-2 my-2 mx-4 rounded text-center m-auto">
            <Link href={item.path} className="text-emerald-900">
                <span>{item.icon}</span>
                <span className="text-2xl">{item.name}</span>
            </Link>
        </li>
    )
}

export const navs = [
    {
        name: "Home",
        path: "/",
        icon: null
    },
    {
        name: "All Time Favourites",
        path: "/movie/favourites",
        icon: null
    },
    {
        name: "Wishlist",
        path: "/movie/wishlist",
        icon: null
    },
]

/**
 * 
 * 
 // export const MainNavigation = () => {
//     const renderNavs = () => navs.map(item => <RenderNavElement key={item.name} item={item} />)
//     return (
//         <Navbar
//             fluid={true}
//             rounded={true}
//         >
//             <Navbar.Collapse>
//                 {renderNavs()}
//             </Navbar.Collapse>
//         </Navbar>
//     )
// }

// const RenderNavElement = ({ item }) => {
//     return (
//         <Navbar.Link href={item.path}>
//             <span>{item.icon}</span>
//             <span>{item.name}</span>
//         </Navbar.Link>
//     )
// }
 */