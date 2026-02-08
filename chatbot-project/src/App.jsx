import { useState, useEffect, useRef } from 'react'                   // Here, it means that, inside node_modules/react folder, it will use only useState feature. Thus, inside App component, ESLint extention is showing a mistake of React.useState by underlining 'React' word. Thus we will remove that word only inside App component.
import { ChatInput } from './components/ChatInput'                    // As we are using Vite, this Vite automatically adds this as- ChatInput.jsx or ChatInput.js . Thus, we wrote ChatInput only.
import RobotProfileImage from './assets/robot.png'                    // RobotProfileImage can be any name & this name shouldn't contain curly braces.
import UserProfileImage from './assets/user.png'
import LoadingSpinnerGif from './assets/loading-spinner.gif'
import './App.css'                                                    // ./ -> means current folder. Folder(which is 'src' folder) that contains the file.
                                                                      // This 'import' is a feature of Vite. Vite lets us import any type of file.


function ChatMessage({ message, sender }) {
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
        {message}
      </div>
      {sender === 'user' && (
        <img src={UserProfileImage} className="chat-message-profile" />
      )}
    </div>
  )
}


// Created Custom hook -> 'useAutoScroll'. We Will make the auto-scroll feature a custom hook, so that we can easily add this feature to other components. Thus, cut-&-pasted useRef() & useEffect() hooks from the ChatMessages component into this custom hook function -> useAutoScroll.
function useAutoScroll(dependencies) {
  // This .useRef() will take the React JSX
  const chatMessagesRef = useRef(null);

  // React will run this useEffect's function -> after the component is created or updated 
  //                                          -> & every time the component is updated.
  useEffect(() => {
    const containerElem = chatMessagesRef.current;  // In a variable, when it has Elem, then it indicates that this variable contains an HTML element.

    if(containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;   // Here, as we set the scroll top to the total height, it's gonna scroll all the way down to the bottom.
    }
  }, dependencies);                       // This array controls when useEffect runs.
                                          // If it's empty array, useEffect only run once after the component is created.
                                          // We can also put value such as the parameter "[dependencies]". In that case, [dependencies] will run this function every time this dependencies value changes. This array is called- Dependency Array. It controls when useEffect runs.
                                          // wrote 'dependencies' instead of '[dependencies]', bcz, dependencies is already passed into the function as an array (like [chatMessages]), putting it inside another set of brackets would create a nested array [[chatMessages]].

  // Return the value, which is -> 'ref variable'. So components can use it. Cz this ref will be used outside the hook.
  return chatMessagesRef;
}


// By adding this prop inside ChatMessages component, this component has now access of the chatMessages. It's receiving App component's inside ChatMessages's props.
function ChatMessages({ chatMessages }) {
  // Used Custom hooks -> 'useAutoScroll' with the 'dependencies' array & used the ref that it returns.
  // Reason behind using [chatMessages] instead of dependencies: To work without an error, the variable 'dependencies' must actually exist inside MyComponent. As it isn't defined here, the code will crash. But chatMessages exists, so passing [chatMessages] works perfectly.
  const chatMessagesRef = useAutoScroll([chatMessages]);

  return (
    <div
      className="chat-messages-container"
      ref={chatMessagesRef}                                   // This chatMessagesRef variable is the container that will hold the .useRef's part.
    >
      {chatMessages.map((chatMessage) => {
        const isWelcome = (chatMessage.id === "id1");

        return isWelcome ? (
          <div 
            className="welcome-message"
            key={chatMessage.id}
          >
            {chatMessage.message}
          </div>
        ) : (
          <ChatMessage
            sender={chatMessage.sender}
            key={chatMessage.id}            // Here, key is a mandatory name in this context. key is a special React attribute used for list items. You cannot rename it to id or anything else and expect React to treat it as the list key.
            message={
              chatMessage.type === "Loading" ? (          // Will show spinner image when this message is a loading-type message.
                <img 
                  src={LoadingSpinnerGif}
                  className="loading-spinner-text"
                  alt="Loading"
                />
              ) : (
                chatMessage.message
              )
            }
          />
        );
      })}
    </div>
  );
}


// TODO: Changed its code to my App component's code. Here, you will see some mistakes are showing by ESLint extension.
function App() {
  // Will convert chatMessages variable into State, thus it will then update the HTML & will show the updated values in the webpage. Using React.useState(), if we update its inside data, it will also update the HTML. React.useState() returns an array.
  // Did Array Destructuring:
  const [chatMessages, setChatMessages] = useState([{             // useState gives us two values. First value is the current data which is chatMessages. Second is setChatMessages, which is a function {Updater function} to update this data.
    message: 'Welcome to the chatbot project! Send a message using the textbox below.',
    id: 'id1'
  }]);

  // const chatMessages = array[0];                  // array[0] is current data which is first value of useState.
  // const setChatMessages = array[1];               // array[1] is the second value which is a function to update this data. This updater function will update the HTML.
  // Will use JS to convert this upper code's data into these components.
  
  return (
    <div
      className="app-container">
        <ChatMessages                               // ChatMessages & ChatInput are also showing error as we ain't using these here. Thus, these two components should also be moved in this file.
          chatMessages={chatMessages}
        />
        {/* Here, By App Component -> these two child component's props are being send to their own individual. And inside ChatInput & ChatMessages component- they are receiving their props as i wrote there inside their parameter. Thus, props naming convention must be exact same. */}
        <ChatInput
          chatMessages={chatMessages}
          setChatMessages={setChatMessages}
        />
    </div>
  );
}

export default App



/*
In this file, we won't put this code as it's inside main.jsx already.
      const container = document.querySelector('.js-container');
      ReactDOM.createRoot(container).render(<App />);
*/