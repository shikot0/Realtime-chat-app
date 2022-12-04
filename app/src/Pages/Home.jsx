import {useState, useEffect, useRef, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {allUsersRoute} from '../utils/APIRoutes';
// import {io} from 'socket.io-client'
import ContactSection from '../Components/ContactSection';
import MessageSection from '../Components/MessageSection';
import DragContext from '../utils/GlobalContext';
import './Home.css'

function Home() {
    const {isDragging, setIsDragging} = useContext(DragContext);
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentChat, setCurrentChat] = useState(null);
    const divider = useRef();
    const messageSection = useRef();
    const contactSection = useRef();
    const socket = useRef();
    const navigate = useNavigate();

    useEffect(() => {
        divider.current.style.setProperty('--left', `calc(35% - ${divider.current.offsetWidth/2}px`)
        if(localStorage.getItem('contact-section-width')) {
            divider.current.style.setProperty('--left', `calc(${JSON.parse(localStorage.getItem('contact-section-width'))}% - ${divider.current.offsetWidth/2}px)`)
        }

        if(!localStorage.getItem('chat-app-user')) {
            navigate('/register');
        }else {
            setCurrentUser(JSON.parse(localStorage.getItem('chat-app-user')));  
        }
    }, [navigate])

    useEffect(() => {
        if(currentUser) {
            fetch(`${allUsersRoute}/${currentUser._id}`)
            .then(res => res.json())
            .then(data => {
                setContacts(data);
            })
        }
    }, [currentUser])

    useEffect(() => {
        if(isDragging) {
            document.querySelector('main').classList.add('dragging');
        }else {
            document.querySelector('main').classList.remove('dragging')
        }
    }, [isDragging])

    function handleMouseMove(e) {
        const availWidth = window.innerWidth;
        if(isDragging) {
             let xValue = (e.clientX/availWidth) * 100;
             if(xValue < 30) {
                 xValue = 30;
             }else if(xValue > 80) {
                 xValue = 80;
             }
             contactSection.current.style.width = `${xValue}%`
             messageSection.current.style.width = `${100 - xValue}%`
             divider.current.style.setProperty("--left", `calc(${xValue}% - ${divider.current.offsetWidth/4}px)`);
        }
    }

 
    function handleChatChange(chat) {
        setCurrentChat(chat);
    }
    function handleMenu() {
        contactSection.current.classList.toggle('visible')
    }
    return (
        <section id="home-page">
            <div id="toggle-menu-button" onClick={handleMenu}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="menu"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><rect x="3" y="11" width="18" height="2" rx=".95" ry=".95"/><rect x="3" y="16" width="18" height="2" rx=".95" ry=".95"/><rect x="3" y="6" width="18" height="2" rx=".95" ry=".95"/></g></g></svg>
            </div>
            <ContactSection currentUser={currentUser} contactSection={contactSection} contacts={contacts} handleChatChange={handleChatChange}/>
            <div className="divider"
                ref={divider}
                onMouseDown={(e) => {if(e.target === divider.current) {setIsDragging(true)}}}
                onTouchStart={(e) => {if(e.target === divider.current) {setIsDragging(true)}}}
                onMouseMove={e => {handleMouseMove(e)}}
                onMouseLeave={() => {setIsDragging(false)}}
                onMouseUp={() => {setIsDragging(false)}}
                onTouchEnd={() => {setIsDragging(false)}}
                >
            </div>
            <MessageSection currentChat={currentChat} currentUser={currentUser} messageSection={messageSection} socket={socket}/>
        </section>
    )
}


export default Home;