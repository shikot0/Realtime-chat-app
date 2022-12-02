import './MessageSection.css';

// function toggleClass(e) {
//     let timer = setTimeout(() => {
//         e.target.classList.toggle('selected');
//         console.log('test')
//     }, 3000)
//     clearTimeout(timer)
// }

function handleMouseOver(e) {
    const rect = e.target.getBoundingClientRect();
    const x = ((e.clientX - rect.left)/rect.width) * 100;
    const y = ((e.clientY - rect.top)/rect.height) * 100;
    e.target.style.setProperty('--mouse-x', `${x}%`);
    e.target.style.setProperty('--mouse-y', `${y}%`);
}

function convertTime(time) {
    const inputDate = new Date(time.toString().slice(0,10));
    const outputDate = inputDate.toLocaleString('default', {weekday: 'short'});
    const inputTime = new Date(1999, 11, 25, `${time.toString().slice(11,13)}`, `${time.toString().slice(14,16)}`, 0, 0);
    const outputTime = inputTime.getMinutes() < 10 ? `${inputTime.getHours()}:0${inputTime.getMinutes()}` : `${inputTime.getHours()}:${inputTime.getMinutes()}`;
    const output = `${outputDate} ${outputTime}`
    return output;
} 

function IncomingMessage({message}) {
    convertTime('2022-12-01T18:54:45.947Z')
    return(
        <div className="incoming-message">
            <div className="content" onMouseMove={handleMouseOver}>
                <p className="text-content">{message.message}</p>
                <small className="time">{message.time? convertTime(message.time): ''}</small>
            </div>
        </div>
    )
}

function OutgoingMessage({message}) {
    return(
        <div className="outgoing-message">
            <div className="content" onMouseMove={handleMouseOver}>
                {/* <p className="text-content">Lorem ipsum dolor sit amet.</p> */}
                <p className="text-content">{message.message}</p>
                <small className="time">{message.time? convertTime(message.time): ''}</small>
            </div>
        </div>
    ) 
}

export {IncomingMessage, OutgoingMessage}