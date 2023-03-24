import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

export const Navbar = () => {
  const { data: session, status } = useSession()

  const renderNavs = () => navs.map(item => <RenderNav key={item.name} status={status} item={item} />)
  return (
    <nav className='header'>
      <h1 className='logo'>
        <a href="#">NextAuth</a>
      </h1>
      
      {/* as we are now handling session from Server Side (in blogs.js page), we dont have to wait and fetch session data on each request and thus no need to worry about ui flickers on refresh or requests */}
      {/* <ul className={`main-nav`}>
        {renderNavs()}
      </ul> */}

      <ul className={`main-nav ${status === "loading" ? "loading" : "loaded"}`}>
        {renderNavs()}
      </ul>
    </nav>
  )
}

const RenderNav = ({ item, status }) => {
  const { name, path, clickHandler } = item

  console.log(status, "status")

  return (
    // status === "authenticated" && (name !== "Sign In") || status === "unauthenticated" && (name !== "Sign Out")
    status === "authenticated" && (name !== "Sign In")
      ||
      status === "unauthenticated" && (name !== "Sign Out" && name !== "Profile")
      ?
      <li>
        <Link onClick={clickHandler} href={path}>{name}</Link>
      </li>
      : null
  )
}

// const RenderNav = ({item}) => {
//   const {name, path, clickHandler} = item

//   return (
//     <li>
//       <Link onClick={clickHandler} href={path}>{name}</Link>
//     </li>
//   )
// }

const navs = [
  {
    name: "Home",
    path: "/",
    clickHandler: null
  },
  {
    name: "Profile",
    path: "/profile",
    clickHandler: null
  },
  {
    name: "Blogs",
    path: "/blogs",
    clickHandler: null
  },
  {
    name: "Sign In",
    path: "/api/auth/signin",
    // clickHandler: signIn,
    // clickHandler: () => signIn("")
    clickHandler: (e) => {
      e.preventDefault()
      signIn("github")
    }
  },
  {
    name: "Sign Out",
    path: "/api/auth/signout",
    clickHandler: () => signOut()
    // clickHandler: signOut
  }
]
