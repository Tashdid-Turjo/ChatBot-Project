import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'                    // Bcz in this ChatMessages component, in the jsx code, we used ChatMessage component.
import LoadingSpinnerGif from '../assets/loading-spinner.gif'
import './ChatMessages.css'


// Created Custom hook -> 'useAutoScroll'. We Will make the auto-scroll feature a custom hook, so that we can easily add this feature to other components. Thus, cut-&-pasted useRef() & useEffect() hooks from the ChatMessages component into this custom hook function -> useAutoScroll.
function useAutoScroll(dependencies) {      // ?? Here, by adding chatMessages & add [chatMessages] in the array control, the warning will be gone, but don't know if it's fine for my project.
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
// As we haven't wrote 'export function ChatMessages', so this 'function ChatMessages' is call- 'Default Export'.
function ChatMessages({ chatMessages }) {                       // Here, without using 'export function', in the last of this file, we wrote- 'export default ChatMessages'. That's call- Default Export. It's useful if we want to export only one thing from a file.
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
            type={chatMessage.type}         // Without this code, when robot message is showing loading spinner gif in the message, then time will be shown in that gif.
            time={chatMessage.time}         // Without this code, all the previous user's & robot's message's time will be updated as current time.
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



export default ChatMessages                     // It's useful if we want to export only one thing from a file.
                                                // Instead of writing export function ChatMessages, we wrote this.