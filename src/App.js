import React, { Component } from 'react'
import ContainerOne from './components/example-01/ContainerOne'

export default class App extends Component {
    render() {
        return(
            <div>
                <h1>Using Hooks</h1>
                <ContainerOne />                
            </div>
        )
    }
}