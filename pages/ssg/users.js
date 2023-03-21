import { UserDetails } from '@/components/user'
import React from 'react'

const UsersList = ({users}) => {
  return (
    <>
    <div>UsersList</div>
    {
        users?.map(user => {
            return (
                <div key={user.id}>
                    <UserDetails user={user} />
                </div>
            )
        })
    }
    </>
  )
}

/**
 * when used this async function we can fetch data at build time and send data as props for pre-rendering
 * 
 * this function runs on server side only, and never on client side, code written in this named function wont even be included in js bundle
 * we can write server side code directly in this function, we can use modules such as file systems or query a db can be done in it as well, its so safe that even if using API directly into this function wont reveal it to browser!!
 * this function is only allowed in a page and not in a regular UI based components, its used only for pre-rendering and not client side data fetching
 * this function should return an object containg a props key which is also an object
 * this function runs at build time, which means during dev mode it gets to run on every request to reflect any recent changes might have
 */
export const getStaticProps = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();

    return {
        props: {
            users: data
        }
    }
}

export default UsersList