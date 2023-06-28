import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css'
import config from './bot/config';
import MessageParser from './bot/MessageParser';
import ActionProvider from './bot/ActionProvider';

export const ChatbotTryout = () => {
  return <MyComponent />
}

const MyComponent = () => {
    return (
      <div>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    );
  };
