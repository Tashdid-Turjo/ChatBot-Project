import { useState } from 'react'                  // Here, it means that, inside node_modules/react folder, it will use only useState feature. Thus, inside App component, ESLint extention is showing a mistake of React.useState by underlining 'React' word. Thus we will remove that word only inside App component.
import reactLogo from './assets/react.svg'        // Import images, as we no longer using these images, thus this line showing error. Thus this line should be deleted.
import viteLogo from '/vite.svg'                  // Import images, as we no longer using these images, thus this line showing error. Thus this line should be deleted.
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
