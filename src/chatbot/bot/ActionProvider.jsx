import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleHello = () => {
        const botMsg = createChatBotMessage("Hello, nice to meet you :)")

        setState(prev => ({
            ...prev,
            messages: [...prev.messages, botMsg]
        }))
    }

    const handleBegin = () => {
        const botMsg = createChatBotMessage("Welcome to info system")
        setState(prev => ({
            ...prev,
            messages: [...prev.messages, botMsg]
        }))
    }

    const handleDogPicture = () => {
        const botMsg = createChatBotMessage("Here is a nice dog picture for you!!", { widget: "dogPicture" })

        setState(prev => ({
            ...prev,
            messages: [...prev.messages, botMsg]
        }))
    }

    const handleReady = () => {
        const botMsg = createChatBotMessage("Welcome to Info Sysytem!!", { widget: "systemReady" })

        setState(prev => ({
            ...prev,
            messages: [...prev.messages, botMsg]
        }))
    }

    const handleConfirm = () => {
        const botMsg = createChatBotMessage("Noice, Info Sysytem Started!!", { widget: "confirmed" })

        setState(prev => ({
            ...prev,
            messages: [...prev.messages, botMsg]
        }))
    }

    return (
        <div>
            {React.Children.map(children, (child) => {
                return React.cloneElement(child, {
                    actions: {
                        handleHello,
                        handleBegin,
                        handleDogPicture,
                        handleReady,
                        handleConfirm
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;