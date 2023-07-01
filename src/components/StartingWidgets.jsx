import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleName } from '../store';

export const BeginSystem = (props) => {
    const handleClick = () => {
        props.actions.actions.handleBegin()
    }
    return (
        <button className='action btn' onClick={handleClick}>Got It</button>
    )
}

export const StudentName = (props) => {
    const dispatch = useDispatch();

    const name = useSelector(state => state.name)

    const handleChange = e => {
        dispatch(handleName(e.target.value))
    }

    const handleEnter = (e) => {
        if (e.keyCode === 13) {
            if(name) {
                props.actions.actions.handleName()
            } else {
                alert("enter your name first")
            }
        }
    }

    return (
        <fieldset>
            <label htmlFor="name">Enter Your Name</label>
            <input
                type="text"
                id='name'
                value={name}
                onChange={handleChange}
                onKeyUp={handleEnter}
            />
            <p style={{ fontSize: "11px", color: "purple" }}>and hit enter when you are done</p>
        </fieldset>
    )
}