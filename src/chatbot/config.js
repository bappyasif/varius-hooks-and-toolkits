import { createChatBotMessage } from 'react-chatbot-kit';
import { BeginSystem, StudentName } from '../components/StartingWidgets';
import { AgeGroup, StudentAge } from '../components/AgeRelatedWidgets';
import { StudentEnrolled } from '../components/AfterEnrolledWidget';
// import { AgeGroup, BeginSystem, StudentAge, StudentEnrolled, StudentName } from '../components/AllWidgets';

const botName = "StudentInfoSysBot"

const config = {
  initialMessages: [createChatBotMessage(`Hello, welcome to Student Info System, to begin this process click Got It, thank you :)`, {widget: "beginSystem"})],
  botName: botName,
  widgets: [
    {
        widgetName: "beginSystem",
        widgetFunc: props => <BeginSystem {...props} />
    },
    {
        widgetName: "studentName",
        widgetFunc: props => <StudentName {...props} />
    },
    {
        widgetName: "studentAgeGroup",
        widgetFunc: props => <AgeGroup {...props} />
    },
    {
        widgetName: "studentAge",
        widgetFunc: props => <StudentAge {...props} />
    },
    {
        widgetName: "studentEnrolled",
        widgetFunc: props => <StudentEnrolled {...props} />
    }
  ],
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