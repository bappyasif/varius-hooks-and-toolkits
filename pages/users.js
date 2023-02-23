import User from '@/components/user';
import React from 'react'

// static page generation after fetching some data from an api
// static generation with getStaticProps
function Users({users}) {
  return (
    <div>
        <h1>List Of Users</h1>

        {/* using a component to render user details */}
        {users?.map(user => <User key={user.id} user={user} />)}

        {/* using data rendering in route page directly without using any app component */}
        {/* {
            users?.map(user => {
                return (
                    <div key={user.id}>
                        <h4>{user.name}</h4>
                        <h4>{user.email}</h4>
                    </div>
                )
            })
        } */}
    </div>
  )
}

// every pages instaces or routes get access to this getStaticProps
// getStaticProps must be exported from page component for external data generated from it
// getStaticProps runs only on server side and never on client side
// code within getStaticProps wont be bundled into JS bundle that is sent to browser
// we can directly writre server side code into getStaticProps
// server side code logics for fs,querying db etc all can be done in getStaticProps
// getStaticProps is allowed only in a page and can not be run from a regular componnet outside of pages folder
// getStaticProps is used only for server side pre-rendering and not for client side data fetching
// getStaticProps should return a object with props as a key and which in turn will have an object in it as well (i.e. {props: {prop: value}}), otherwise nextj will throw an error
// getStaticProps will run at buildtime
// getStaticProps will run once at production mode and at each request during development mode, as there will be code changes
export async function getStaticProps () {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")
    const data = await response.json();
    console.log(data, "!!")
    return {props: {users: data}}
}

export default Users