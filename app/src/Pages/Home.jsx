import {useState, useEffect, useRef, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {host, allUsersRoute} from '../utils/APIRoutes';
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
 
    // useEffect(() => {
    //     if(currentUser) {
    //         socket.current = io(host);
    //         socket.current.emit('add-user', currentUser._id)
    //     }
    // }, [currentUser])

    useEffect(() => {
        if(isDragging) {
            document.querySelector('main').classList.add('dragging');
        }else {
            document.querySelector('main').classList.remove('dragging')
        }
        console.log(isDragging)
    }, [isDragging])

    function handleMouseMove(e) {
         if(isDragging) {
             const availWidth = window.innerWidth;
             let xValue = (e.clientX/availWidth) * 100;
             // console.log(xValue)
             if(xValue < 30) {
                 xValue = 30;
             }else if(xValue > 80) {
                 xValue = 80;
             }
             contactSection.current.style.width = `${xValue}%`
             messageSection.current.style.width = `${100 - xValue}%`
             divider.current.style.setProperty("--left", `calc(${xValue}% - ${divider.current.offsetWidth/4}px)`);
             // divider.current.style.left = `calc(${xValue}% - ${divider.current.offsetWidth/2}px)`;
             // divider.current.style.filter = `hue-rotate(-${xValue/4}deg)`
         }else {
            return
         }
    }



    // divider.current.addEventListener('pointerup', () => {
    //     setIsDragging(false)
    //     console.log('dkjfal;j')
    // })
    window.addEventListener('mousemove', e => {
        handleMouseMove(e)
    })
    window.addEventListener('touchend', () => {
        setIsDragging(false);
    })
 
    function handleChatChange(chat) {
        setCurrentChat(chat);
    }

    return (
        <section id="home-page">
            <ContactSection currentUser={currentUser} contactSection={contactSection} contacts={contacts} handleChatChange={handleChatChange}/>
            <div className="divider"
                ref={divider}
                onMouseDown={(e) => {if(e.target === divider.current) {setIsDragging(true)}}}
                onTouchStart={(e) => {if(e.target === divider.current) {setIsDragging(true)}}}
                // onMouseDown={() => {setIsDragging(true)}}
                // onTouchStart={() => {setIsDragging(true)}}
                // onMouseMove={handleMouseMove}
                // onTouchMove={e => {handleMouseMove(e.touches[0])}}
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