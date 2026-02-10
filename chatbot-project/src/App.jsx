import { useState, useEffect } from 'react'                   // Here, it means that, inside node_modules/react folder, it will use only useState feature. Thus, inside App component, ESLint extention is showing a mistake of React.useState by underlining 'React' word. Thus we will remove that word only inside App component.
import { Chatbot } from 'supersimpledev'
import { ChatInput } from './components/ChatInput'                    // As we are using Vite, this Vite automatically adds this as- ChatInput.jsx or ChatInput.js . Thus, we wrote ChatInput only.
import ChatMessages from './components/ChatMessages'                  // In ChatMessages component's file, instead of 'export function ChatMessages'[which is called Named Export], we used Defaault
// import { ChatMessage } from './components/ChatMessage'             // This won't be used here, bcz, in this App component's jsx code, there's ChatInput, ChatMessages component used, but there's no ChatMessage component. Thus, this shouldn't be here.
import './App.css'                                                    // ./ -> means current folder. Folder(which is 'src' folder) that contains the file.
                                                                      // This 'import' is a feature of Vite. Vite lets us import any type of file.


// TODO: Changed its code to my App component's code. Here, you will see some mistakes are showing by ESLint extension.
function App() {
  const DEFAULT_MESSAGES = [
    {
      message: 'Welcome to the chatbot project! Send a message using the textbox below.',
      id: 'id1'
    }
  ]

  // Will convert chatMessages variable into State, thus it will then update the HTML & will show the updated values in the webpage. Using React.useState(), if we update its inside data, it will also update the HTML. React.useState() returns an array.
  // Did Array Destructuring:
  const [chatMessages, setChatMessages] = useState(() => {             // useState gives us two values. First value is the current data which is chatMessages. Second is setChatMessages, which is a function {Updater function} to update this data.
    const saved = localStorage.getItem('messages');
    return saved ? JSON.parse(saved) : DEFAULT_MESSAGES;
  });

  // By using this, we are able to add more User-robotResponse messages using this object.
  useEffect(() => {
    Chatbot.addResponses({
        'hello hi': `Hello sir/madam, how can I help you?`,
        'thank thanx thnx tnx': `Ask me again if you need anything else`,
        'goodbye': `Goodbye. Have a great day!`
    })
  }, []);

  // const chatMessages = array[0];                  // array[0] is current data which is first value of useState.
  // const setChatMessages = array[1];               // array[1] is the second value which is a function to update this data. This updater function will update the HTML.
  // Will use JS to convert this upper code's data into these components.
  
  // For saving the messages even if we refresh the page.
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(chatMessages));    // For saving the chatMessages.
  }, [chatMessages]);


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

export default App                                  // It makes App the default export of that file, so another file can import it without braces.
                                                    // Ex- import App from './App.jsx'
                                                    // and then render/use it.



/*
In this file, we won't put this code as it's inside main.jsx already.
      const container = document.querySelector('.js-container');
      ReactDOM.createRoot(container).render(<App />);
*/