import {useState, useEffect} from 'react';
import Contact from './Contact';
import { useNavigate } from 'react-router-dom';
import './ContactSection.css';

function ContactSection({currentUser, contactSection, contacts, handleChatChange}) {
    const [currentUserName, setCurrentUserName] = useState();
    const [currentSelected, setCurrentSelected] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if(currentUser) {
            setCurrentUserName(currentUser.username)
        }

    }, [currentUser])
    
    function changeCurrentChat(index, contact) {
        setCurrentSelected(index);
        handleChatChange(contact);
        contactSection.current.classList.remove('visible')
    }

    function logout() {
        localStorage.clear('chat-app-user');
        navigate('/register');
    }

    return (
        <aside id="contact-section" ref={contactSection}>
            <div className="contacts-wrapper">
                {currentUserName ? contacts.map((contact, index) => {
                    return <Contact key={index} index={index} currentSelected={currentSelected} details={contact} changeCurrentChat={changeCurrentChat}/>
                }): null}
            </div>
            <footer>
                <div>
                    <h2>You're signed in as <span>{currentUserName}</span></h2>
                </div>
                <button type="button" className="logout-button" onClick={logout}>Log out</button>
            </footer>
        </aside>
    )
}

export default ContactSection;