import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    // console.log(message, message.toLowerCase());
    if(message.toLowerCase().includes("got it")) {
      actions.handleBegin()
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions: {actions},
        });
      })}
    </div>
  );
};

export default MessageParser;