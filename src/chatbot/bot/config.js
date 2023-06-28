import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from '../components/DogPicture';

const botName = "infoSys bot"

const config = {
  initialMessages: [createChatBotMessage(`Greetings, i'm ${botName}`)],
  // widgets: [
  //   {
  //     widgetName: 'dogPicture',
  //     widgetFunc: (props) => <DogPicture {...props} />,
  //   },
  // ],
  botName: botName,
  customStyles: {
    botMessageBox: {
      backgroundColor: '#376B7E',
    },
    chatButton: {
      backgroundColor: '#5ccc9d',
    },
  },
};

export default config;