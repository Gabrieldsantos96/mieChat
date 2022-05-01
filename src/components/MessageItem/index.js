import './styles.css';

function MessageItem ({item,user}) {
   return (
     <div className="message_line"
     style={{justifyContent: user.id === item.author ? 'flex-end' : 'flex:start'}}
     >

        <div className="message_item"
        style={{backgroundColor: user.id === item.author ? '#dcf8c6' : '#fff'}}>
           <div className="message_text">{item.body}</div>
           <div className="message_date">19:00</div>
        </div>
     </div>
   )
}

export default MessageItem;