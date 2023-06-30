import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const handleBegin = () => {
        const botMsg = createChatBotMessage("Got It!! System Started", {widget: "studentName"});

        setState(prev => ({
            ...prev,
            messages: [...prev.messages, botMsg]
        }))
    }

    const handleName = () => {
        const botMsg = createChatBotMessage("You successfully entered your name, and now choose your age group", {widget: "studentAgeGroup"});

        setState(prev => ({
            ...prev,
            messages: [...prev.messages, botMsg]
        }))
    }

    const handleAgeGroup = () => {
        const botMsg = createChatBotMessage("You chosen your age group and now enter your age within that age group", {widget: "studentAge"});

        setState(prev => ({
            ...prev,
            messages: [...prev.messages, botMsg]
        }))
    }

    const handleStudentAge = () => {
        const botMsg = createChatBotMessage("You have now successfuly enrolled into student info system. congratulations", {widget: "studentEnrolled"});

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
                        handleBegin,
                        handleName,
                        handleAgeGroup,
                        handleStudentAge
                    },
                });
            })}
        </div>
    );
};

export default ActionProvider;