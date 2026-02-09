import dayjs from 'dayjs'
import RobotProfileImage from '../assets/robot.png'                    // RobotProfileImage can be any name & this name shouldn't contain curly braces.
import UserProfileImage from '../assets/user.png'
import './ChatMessage.css'


export function ChatMessage({ message, sender }) {
  const [saveTime, setSaveTime] = useState([]);

  function sendMessage(text) {
    // Implementing timestamp for each & every message
    const time = dayjs().valueOf();     // To get the current time
  
    const newMessage = {
      id: crypto.randomUUID(),
      text,
      time
    };

    setSaveTime([...saveTime, setSaveTime]);
  }

  return (
    <div
      className={
        sender === 'user' 
        ? 'chat-message-user' 
        : 'chat-message-robot'
      }
    >
      {sender === 'robot' && (
        <img src={RobotProfileImage} className="chat-message-profile" />
      )}
      <div className="chat-message-text">
        <div className="chat-message-content">
          {message}
        </div>
        <div className="chat-message-time">
          {dayjs(time).format('h:mma')}
        </div>
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  )
}