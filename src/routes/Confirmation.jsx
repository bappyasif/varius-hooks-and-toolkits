import React from 'react'
import { useGetStoreStates } from '../hooks'
import { Link } from 'react-router-dom';

export const ConfirmationPage = () => {
    const {age, name} = useGetStoreStates();

  return (
    <div className='container'>
        <h1>Confirmation Page</h1>
        <p style={{fontSize: "29px"}}>Your name <span>{name}</span> aged <span>{age}</span> has been added to student system. you may <Link to={"/"}>exit</Link> now</p>
    </div>
  )
}
