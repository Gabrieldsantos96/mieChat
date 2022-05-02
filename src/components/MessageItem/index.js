import './styles.css';
import { useState,useEffect } from 'react';

function MessageItem ({item,user}) {
   const [ time, setTime] = useState('');

   useEffect(() => {
      if(item.date > 0 ) {
        let local = new Date(item.date.seconds * 1000);
        let hours = local.getHours();
        let minutes = local.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        setTime(`${hours}:${minutes}`);
      }
    },[item])

   return (
     <div className="message_line"
     style={{justifyContent: user.id === item.author ? 'flex-end' : 'flex:start'}}
     >

        <div className="message_item"
        style={{backgroundColor: user.id === item.author ? '#dcf8c6' : '#fff'}}>
           <div className="message_text">{item.body}</div>
           <div className="message_date">{time}</div>
        </div>
     </div>
   )
}

export default MessageItem;