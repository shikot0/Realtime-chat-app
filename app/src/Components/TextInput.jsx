import {useState} from 'react';
import './TextInput.css';
function TextInput({handleSendMessage}) {
    const [message, setMessage] = useState('');

    function sendChat(e) {
        e.preventDefault();
        if(message.length > 0) {
            handleSendMessage(message)
            setMessage('')
        }
    }
    return(
        <>
            <form onSubmit={e => {sendChat(e)}}>
                <input type="text" name="text-input" id="text-input" placeholder="Type here..." value={message} onInput={e => {setMessage(e.target.value)}} />
                <button type='submit' className="send-message-button">
                    {/* <img src={`${process.env.PUBLIC_URL}/logos/paper-plane-outline.svg`} alt="send" /> */}
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="paper-plane"><rect width="24" height="24" opacity="0"/><path d="M21 4a1.31 1.31 0 0 0-.06-.27v-.09a1 1 0 0 0-.2-.3 1 1 0 0 0-.29-.19h-.09a.86.86 0 0 0-.31-.15H20a1 1 0 0 0-.3 0l-18 6a1 1 0 0 0 0 1.9l8.53 2.84 2.84 8.53a1 1 0 0 0 1.9 0l6-18A1 1 0 0 0 21 4zm-4.7 2.29l-5.57 5.57L5.16 10zM14 18.84l-1.86-5.57 5.57-5.57z"/></g></g></svg>
                </button>
            </form>
        </>
    )
}

export default TextInput;