import React, { useReducer, useState } from 'react'
// https://www.npmjs.com/package/use-immer

const ACTIONS = {
    ADD_TODO: "add-todo",
    TOGGLE_TODO: "toggle-todo"
}


const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            // return [...state.todos, { id: Date.now(), name: action.payload.name, completed: false }]
            return {
                todos: [...state.todos, { id: Date.now(), name: action.payload.name, completed: false }],
                // udating another state at add todo action
                todoCount: state.todoCount + 1
            }
        case ACTIONS.TOGGLE_TODO:
            // return state.todos.map(item => item.id === action.payload.id ? {...item, completed: !item.completed} : item)
            return {
                todos: state.todos.map(item => item.id === action.payload.id ? {...item, completed: !item.completed} : item),
                // so that out todo counts stays consitent with state vafter map operation
                todoCount: state.todoCount
            }
        default:
            return state
    }
}

function TodosV2() {
    let [{todos, todoCount}, dispatch] = useReducer(reducer, {todos: [], todoCount: 0})
    let [text, setText] = useState()

    return (
        <div>
            <h2>TodosV2</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                dispatch({type: ACTIONS.ADD_TODO, payload: {name: text}})
                setText("")
            }}>
                <input type={"text"} value={text} onChange={(e) => setText(e.target.value)} />
            </form>
            {todos?.length} {todoCount} 
            {JSON.stringify(todos, null, 2)}
            {
                todos.map(todo => <div style={{textDecoration: todo.completed ? "line-through" : ""}} key={todo.id} onClick={() => dispatch({type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id}})}>{todo.name}</div>)
            }
        </div>
    )
}

export default TodosV2