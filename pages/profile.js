import React from 'react'
import styles from "../styles/Profile.module.css"
import styles2 from "../styles/Profile.module.scss"

const ProfilePage = () => {
  return (
    <>
    <div className='text text-primary'>ProfilePage</div>
    <button className={styles.highlight}>Demo</button>
    <button className={styles2.highlight}>Demo2</button>
    </>
  )
}

export default ProfilePage