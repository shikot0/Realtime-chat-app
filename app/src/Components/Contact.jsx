import {useState, useEffect} from 'react';
import { getAllMessagesRoute } from '../utils/APIRoutes';
import './Contact.css';

function Contact({details, index, currentSelected, changeCurrentChat}) {
    const [lastMessage, setLastMessage] = useState('');
    function getLastMessage() {
        fetch(getAllMessagesRoute, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                from: JSON.parse(localStorage.getItem('chat-app-user'))._id,
                to: details._id,
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data[0]) {
                setLastMessage(data[data.length-1].message)
            }else {
                return null
            }
        })
    }

    useEffect(getLastMessage,[getLastMessage])
    return(
        // <article onClick={() => {changeCurrentChat(index, details)}}  className={index === currentSelected ? "selected contact": 'contact'}>
        //     <div className="profile-picture-wrapper">
        //         <img src={`${process.env.PUBLIC_URL}/pfp_test.jpg`} alt="User" className="profile-picture" />
        //     </div>
        //     <div className="user-name-and-message">
        //         <h3 className="username">{details.username}</h3>
        //         <p className="last-message">The users last message was Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus adipisci facere quod, beatae delectus unde voluptas officiis quasi ducimus ullam!</p>
        //     </div>
        // </article>
        <article onClick={() => {changeCurrentChat(index, details)}}  className={index === currentSelected ? "selected contact": 'contact'}>
            <div className="user-name-and-message">
                <h3 className="username">{details.username}</h3>
                <p className="last-message">{lastMessage ? lastMessage : ''}</p>
            </div>
        </article>
    )
}

export default Contact;