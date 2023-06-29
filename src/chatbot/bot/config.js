import { createChatBotMessage } from 'react-chatbot-kit';
import DogPicture from '../components/DogPicture';
import { BotAvatar } from '../components/BotAvatar';
import { BeginNow } from '../components/BeginNow';

const botName = "InfoSys"

const config = {
  // initialMessages: [createChatBotMessage(`Greetings, i'm ${botName}`)],
  initialMessages: [createChatBotMessage(`Greetings, i'm ${botName}`, {
    widget: "systemReady"
  }),
  ],
  // widgets: [
  //   {
  //     widgetName: 'dogPicture',
  //     widgetFunc: (props) => <DogPicture {...props} />,
  //     // Any piece of state defined in the state object that you want to pass down to this widget
  //     mapStateToProps: [
  //       "begin",
  //       "ready",
  //     ],
  //   },
  //   {
  //     widgetName: "systemReady",
  //     widgetFunc: props => <BeginNow {...props} />,
  //     mapStateToProps: [
  //       "begin",
  //       "ready",
  //     ],
  //   },
  //   {
  //     widgetName: "confirmed",
  //     widgetFunc: props => <h2>Confirmed!! Lets gooo</h2>,
  //   }
  // ],
  // Defines an object that will be injected into the chatbot state, you can use this state in widgets for example
  state: {
    begin: false,
    ready: false,
    name: "",
    age: null

  },
  // customComponents: {
  //   // Replaces the default header
  //   header: () => <div style={{ backgroundColor: 'red', padding: "5px", borderRadius: "3px" }}>This is the header</div>,
  //   botAvatar: props => <BotAvatar {...props} />
  // },
  botName: botName,
  customStyles: {
    // Overrides the chatbot message styles
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    // Overrides the chat button styles
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
};

export default config;