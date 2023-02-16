import React, { useReducer, useState } from 'react'

const ACTIONS = {
    ADD_TODO: "add-todo",
    TOGGLE_TODO: "toggle-todo",
    DELETE_TODO: "delete-todo"
}

const addNewTodo = (name) => ({ id: Date.now(), name: name, complete: false })

const reducer = (todos, action) => {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            return [...todos, addNewTodo(action.payload.name)]
        case ACTIONS.TOGGLE_TODO:
            return todos.map(item => {
                if (item.id === action.payload.id) {
                    return { ...item, complete: !item.complete }
                }
                return item
            })
        case ACTIONS.DELETE_TODO:
            return todos.filter(item => item.id !== action.payload.id)
        default:
            todos
    }
}

function Todos() {
    let [todos, dispatch] = useReducer(reducer, []);
    let [title, setTitle] = useState();

    const handleChange = e => setTitle(e.target.value)

    const handleFormSubmit = e => {
        e.preventDefault();
        dispatch({ type: ACTIONS.ADD_TODO, payload: { name: title } })
        setTitle("")
    }

    // console.log(todos, "todos!!")

    const renderTodos = () => todos?.map(todo => <Todo key={todo.id} todo={todo} dispatch={dispatch} />)

    return (
        <div>
            <h2>Basic Todos With useReducer</h2>
            <form onSubmit={handleFormSubmit}>
                <input type={"text"} value={title} onChange={handleChange} />
            </form>
            <h2>All Todos</h2>
            {renderTodos()}
        </div>
    )
}

const Todo = ({ todo, dispatch }) => {
    const handleToggle = () => {
        dispatch({type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id}})
    }
    const handleDelete = () => {
        dispatch({type: ACTIONS.DELETE_TODO, payload: {id: todo.id}})
    }
    return (
        <h3 style={{ color: todo?.complete ? "#AAA" : "#000" }}>
            <span>{todo?.name}</span>
            <span>
                <button onClick={handleToggle}>Toggle</button>
                <button onClick={handleDelete}>Delete</button>
            </span>
        </h3>
    )
}

export default Todos