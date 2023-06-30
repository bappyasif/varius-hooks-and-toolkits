import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { handleBegin, handleReset } from '../store';
import { useNavigate } from 'react-router-dom';

export const MakeSystemReady = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()

    const handleClick = () => {
        dispatch(handleBegin())
        navigate("/chatbot")
    }

    const resetPreviousStoreStates = () => {
        dispatch(handleReset())
    }

    useEffect(() => {
        resetPreviousStoreStates()
    }, [])
    
    return (
        <div className='container'>
            <h1>Fireup Student Info System</h1>
            <button onClick={handleClick}>Click To Begin</button>
        </div>
    )
}
