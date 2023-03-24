import { getSession, signIn } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import styles from "../styles/Profile.module.css"
import styles2 from "../styles/Profile.module.scss"

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const checkSession = () => {
    getSession().then(session => {
      if (session) {
        setLoading(false);
      } else {
        signIn()
      }
    })
  }

  useEffect(() => {
    checkSession()
  }, [])

  if (loading) {
    return <h1>Loading Data....</h1>
  }

  return (
    <>
      <div className='text text-primary'>ProfilePage</div>
      <button className={styles.highlight}>Demo</button>
      <button className={styles2.highlight}>Demo2</button>
    </>
  )
}

// this resolves of "keeping callback url" after initial "routing back to that protected route page"
// by setting a callback url to home page "/" we are eliminating that residual callback url footprints from cookies
export const getServerSideProps = context => {
  const {res} = context;
  res.setHeader("next-auth.callback-url", ["/"])

  return {
    props: {}
  }
}

export default ProfilePage