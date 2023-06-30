import React from 'react'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import ActionProvider from '../chatbot/ActionProvider'
import config from '../chatbot/config'
import MessageParser from '../chatbot/MessageParser'

export const StudentInfoSysChatbot = () => {
    return (
        <div className='container chatbot'>
            <Chatbot
                actionProvider={ActionProvider}
                config={config}
                messageParser={MessageParser}
            />
        </div>
    )
}
