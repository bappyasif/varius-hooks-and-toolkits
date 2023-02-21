import React, { Component } from 'react'
import AnotherExample from './components/AnotherExample'
import Counter from './components/Counter'
import Form from './components/exploring_further/Form'
import Post from './components/exploring_further/Post'
import Todos from './components/Todos'
import TodosV2 from './components/Todos-V2'
export default class App extends Component {
    render() {
        return(
            <div>
                <h1>Using Hooks</h1>
                <Counter />
                <Todos />
                <TodosV2 />
                <AnotherExample />
                <Post />
                <Form />
            </div>
        )
    }
}