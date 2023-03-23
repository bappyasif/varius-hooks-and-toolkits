import React from 'react'
import styles from "../styles/About.module.css"
import styles2 from "../styles/About.module.scss"

const AboutPage = () => {
  return (
    <>
      <h2>About Us</h2>
      <button className={styles.highlight}>Demo</button>
      <button className={styles2.highlight}>Demo2</button>
    </>
  )
}

export default AboutPage