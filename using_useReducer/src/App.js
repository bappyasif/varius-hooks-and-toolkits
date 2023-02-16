import React, { Component } from 'react'
import Counter from './components/Counter'
import Todos from './components/Todos'
export default class App extends Component {
    render() {
        return(
            <div>
                <h1>Using Hooks</h1>
                <Counter />
                <Todos />
            </div>
        )
    }
}