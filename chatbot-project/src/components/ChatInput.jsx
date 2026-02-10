import { useState } from 'react'
import { Chatbot } from 'supersimpledev'                    // Imported this library as Chatbot was showing error through ESLint extension.
import dayjs from 'dayjs'
import LoadingSpinnerGif from '../assets/loading-spinner.gif'
import './ChatInput.css'                                        // It's a Vite feature.


// By adding these two props inside ChatInput component, this component has now access of the chatMessages & setChatMessages inside sendMessage function. It's receiving App component's inside ChatInput's 2 props.
// export function ChatInput = it's call- 'Named Export'.
export function ChatInput({ chatMessages, setChatMessages, onClear }) {      // export -> ESLint extension will assume that we're going to use this component outside of this file.
  const [inputText, setInputText] = useState('');

  // To disable the send button, when chatbot is showing loading-spinnger gif so that, user can write another message while chatbot is loading to show his desired message but user won't be click the send button in that time.
  const [isLoading, setIsLoading] = useState(false);
  
  function saveInputText(event) {
    // .value -> get the text inside the " input placeholder=............... ".
    setInputText(event.target.value);
    // console.log(inputText);                    // It will show all text for each & every moment that we type in the console.
  }

  // Instead of using .getResponse(), now using .getResponseAsync(). Thus, used async before function.
  async function sendMessage() {
    // Disabling send button when chatbot is showing loading-spinner gif text:
    if (isLoading || inputText === '') {
      return;                                 // Blocks repeated clicks.
    };

    // Set isLoading to true at the start, and set it to false after everything is done.
    setIsLoading(true);

    // In the input box, when user type any word, then after clicking the send button / press enter from keyboard, that text still stays there for a while, but it should be gone immediately right after clicking send button / press enter from keyboard.
    // const textToSend = inputText;            // Keeps a copy
    setInputText("");                           // Clear the text immediately


    // Stored chatMessages & the values/datas in a new variable.
    const userMessage = {                                // Will copy that array into this new array.
                                                         // Added a new value with some key-value pairs into this new array.
      message: inputText,
      sender: 'user',
      time: dayjs().valueOf(),
      id: crypto.randomUUID()
    };

    // Removing the Welcome message once the user sends the first real message.
    const isOnlyWelcomeMessage = chatMessages.length === 1 && chatMessages[0].sender !== 'user';
    const newChatMessages = isOnlyWelcomeMessage
      ? [userMessage]
      : [...chatMessages, userMessage];

    // Put newChatMessages variable in this setChatMessages props.
    setChatMessages([
      ...newChatMessages,
      {
        type: 'Loading',                // Changed Loading... text to -> loading-spinner image.
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);
    
    // When using .getResponseAsync(). Robot won't reply immediately.
    // Robot won't reply immediately now. Cz instead of using .getResponse(), now using .getResponseAsync(). Thus, await & .getResponseAsync() should be written.
    const response = await Chatbot.getResponseAsync(inputText);             // Imported external library- supersimpledev. So ESLint ain't showing error for 'Chatbot'.
    
    setChatMessages([
        // This makes a copy of newChatMessages, but without the last message in the array.
        // For now, newChatMessages currently ends with the robot's loading-spinner gif. Thus, added this code after immediately changing the 'loading-spinner gif' message into robot's desired message.
        ...newChatMessages,
        {
          message: response,
          sender: 'robot',
          time: dayjs().valueOf(),
          id: crypto.randomUUID()
        }
    ]);

    setIsLoading(false);        // Makes button return to normal again.
  }

  // For Enter & Escape {for Escape, it will ommit the text in input box's text} keyboard shortcut button:
  function handleKeyDown(event) {
    if(event.key === 'Enter') {
      sendMessage();
    }
    if(event.key === 'Escape') {
      setInputText("");           // Will clear the input box
    }
  }

  return (
    <div                                        /* Will use flexbox for both Send button & Input box. That can't be done using fragment. Thus used div. */
      className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}            // Putting the function inside this input tag.
        value={inputText}                   // Will remove the text in textbox after clicking Send button. // It's called- Controlled Input. That's how we control the text inside textbox.
        onKeyDown={handleKeyDown}           // For Enter keyboard shortcut button.
        className="input-box"               // CSS style
      />
      <button
        onClick={sendMessage}
        disabled={isLoading}                // Disabling send button when chatbot is showing loading-spinner gif.
        className="send-button"             // CSS style
      >
        {isLoading ? (
          <img 
            src={LoadingSpinnerGif}
            className="Loading-spinner-button"
            alt="Loading"
          />
        ) : (
          "Send"
        )}
      </button>
      <button
        onClick={onClear}
      >
        Clear
      </button>
    </div>
  )
}