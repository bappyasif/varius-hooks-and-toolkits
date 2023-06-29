import React from 'react';

const MessageParser = ({ children, actions }) => {
    const parse = (message) => {
      if(message.includes("hello")) {
        // const message = createClientMessage('click here!!');
        actions.handleHello()
        console.log("Hiiii :)");
      } else if(message.includes("dog")) {
        actions.handleDogPicture()
      } else if(message.includes("ready")) {
        actions.handleReady()
      } else {
        console.log("Say Hello....")
      }
      // console.log(message);
    };
  
    return (
      <div>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            parse: parse,
            actions: {
              actions
            },
          });
        })}
      </div>
    );
  };

export default MessageParser;