import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


// TODO: Changed its code to my App component's code. Here, you will see some mistakes are showing by ESLint extension.
function App() {
  // Will convert chatMessages variable into State, thus it will then update the HTML & will show the updated values in the webpage. Using React.useState(), if we update its inside data, it will also update the HTML. React.useState() returns an array.
  // Did Array Destructuring:
  const [chatMessages, setChatMessages] = React.useState([{             // useState gives us two values. First value is the current data which is chatMessages. Second is setChatMessages, which is a function {Updater function} to update this data.
    message: 'Welcome to the chatbot project! Send a message using the textbox below.',
    id: 'id1'
  }]);

  // const chatMessages = array[0];                  // array[0] is current data which is first value of useState.
  // const setChatMessages = array[1];               // array[1] is the second value which is a function to update this data. This updater function will update the HTML.
  // Will use JS to convert this upper code's data into these components.
  
  return (
    <div
      className="app-container">
        <ChatMessages 
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
