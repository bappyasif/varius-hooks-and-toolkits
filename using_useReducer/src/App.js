import React, { Component } from 'react'
import Counter from './components/Counter'
export default class App extends Component {
    render() {
        return(
            <div>
                <h1>Using Hooks</h1>
                <Counter />
            </div>
        )
    }
}