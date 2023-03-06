import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
// import "./Navbar.css" // can only be done from _app.js as this is a global css module

function Navbar() {
    // const [session, loading] = useSession();
    // const { session, status } = useSession();
    const { data: session, status } = useSession()
    console.log(session, status, "!!")
    return (
        <nav className="header">
            <h1 className="logo">
                <a href="#">NextAuth</a>
            </h1>
            {/* <ul className={`main-nav`}> */}
            {/* className={`main-nav ${!session && status !== 'authenticated' ? "loading" : "loaded"}`} */}
            <ul className={`main-nav ${!session && status !== 'authenticated' ? "loading" : "loaded"}`}>            
                <li><Link href={"/"}>Home</Link></li>
                {status === "authenticated" ? <li><Link href={"/dashboard"}>Dashboard</Link></li> : null}
                <li><Link href={"/blog"}>Blog</Link></li>
                {/* <li><Link href={"/api/auth/signin"} onClick={signIn}>Sign In</Link></li> */}
                {/* <li>
                <Link 
                href={"/api/auth/signin"} 
                onClick={() => signIn("github")} // doing this will not show any consent window or url and directly authorize user with github
                >
                Sign In
            </Link></li> */}

                {/* {!session && <li><Link href={"/api/auth/signin"} onClick={signIn}>Sign In</Link></li>} */}
                {!session && status !== 'authenticated' && <li><Link href={"/api/auth/signin"} onClick={signIn}>Sign In</Link></li>}
                {/* <li><Link href={"/api/auth/signout"} onClick={signOut}>Sign Out</Link></li> */}
                {/* {session && <li><Link href={"/api/auth/signout"} onClick={signOut}>Sign Out</Link></li>} */}
                {session && status !== 'unauthenticated' && <li><Link href={"/api/auth/signout"} onClick={signOut}>Sign Out</Link></li>}
            </ul>
        </nav>
    )
}

export default Navbar