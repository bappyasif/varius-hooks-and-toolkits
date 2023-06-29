import React from 'react'

export const BeginNow = (props) => {
    console.log(props.state.begin, props.ready, props)

    const handleClick = () => {
        props.actions.actions.handleConfirm()
        // props.actionProvider.handleConfirm()
    }
    return (
        <button onClick={handleClick}>Begin Now!!</button>
    )
}
