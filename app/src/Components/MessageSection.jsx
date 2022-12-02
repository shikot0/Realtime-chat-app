import './MessageSection.css';
import TextInput from './TextInput';
import WelcomeSection from './WelcomeSection';
import {useState, useEffect, useRef} from 'react';
import {io} from 'socket.io-client';
import {IncomingMessage, OutgoingMessage} from './Messages';
import {host, sendMessageRoute, getAllMessagesRoute} from '../utils/APIRoutes';

function MessageSection({currentChat, currentUser, messageSection, socket}) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const scrollRef = useRef();
    const notification = useRef();

    async function handleSendMessage(msg) {
        await fetch(sendMessageRoute, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                from: currentUser._id,
                to: currentChat._id,
                message: msg
                })
        });
        socket.current.emit('send-msg', {
            to: currentChat._id,
            from: currentUser._id,
            message: msg,
        });
        // console.log(socket.current)
        const msgs = [...messages];
        msgs.push({ fromSelf:true, message:msg });
        setMessages(msgs);
    }
    
    useEffect(() => {
        // console.log(socket)
        if(socket.current) {
            socket.current.on('msg-receive', msg => {
                console.log('')
                setArrivalMessage({ fromSelf: false, message: msg })
                notification.current.play();
            })
        }
    }, [socket, currentChat]);

    useEffect(() => {
        arrivalMessage && setMessages(prev => [...prev, arrivalMessage])
    },[arrivalMessage])

    useEffect(() => {
        if(scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: 'smooth' })  
        }
        // console.log(scrollRef.current.scrollIntoView) 
    }, [messages])

    useEffect(() => {
        if(currentChat) {
            fetch(getAllMessagesRoute, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    from: currentUser._id,
                    to: currentChat._id,
                })
            })
            .then(res => res.json())
            .then(data => {
                setMessages(data);
            })
        }
    }, [currentUser, currentChat])

    // useEffect(() => {
    //     if (currentUser) {
    //         socket.current = io(host);
    //         socket.current.emit('add-user', currentUser._id);

    //     }
    // }, [currentUser])
    useEffect(() => {
        if(currentUser) {
            socket.current = io(host);
            socket.current.emit('add-user', currentUser._id)
        }
    }, [currentUser, socket]);

    return (
        <section id="message-section" ref={messageSection}>
            {currentChat ?
                <>  
                    <div className="message-banner">
                        <h2>{currentChat.username}</h2>
                    </div>
                    <div className="messages-wrapper">
                        {messages.map((message, index) => {
                            if(message.fromSelf) {
                                return <OutgoingMessage key={index} message={message}/>
                            }else {
                                return <IncomingMessage key={index} message={message}/>
                            }
                        })}
                        <div ref={scrollRef}></div>
                    </div>
                    <TextInput socket={socket} handleSendMessage={handleSendMessage}/>
                </>
            :
                <WelcomeSection/> 
            }
            <audio ref={notification} className="notification" src={`${process.env.PUBLIC_URL}/alert.m4a`}></audio>
        </section>
    )
}

export default MessageSection;