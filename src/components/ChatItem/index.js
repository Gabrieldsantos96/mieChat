import './styles.css';
import {useState, useEffect} from 'react'; 

function ChatItem ({onClick,active,item}) {

  const [ time,setTime ] = useState("");

  useEffect(() => {
    if(item.lastmessageDate > 0 ) {
      let local = new Date(item.lastmessageDate.seconds * 1000);
      let hours = local.getHours();
      let minutes = local.getMinutes();
      hours = hours < 10 ? '0' + hours : hours;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${minutes}`);
    }
  },[item])
  
  return (
    <div 
    className={`chat_item ${active? 'active': ''}`}
    onClick={onClick}>
      <div>
      <img 
      className='chat_item_avatar'
      src={item.image}
      alt=""/>
      </div>
      
        <div className="chat_item_lines">
          <div className="chat_item_line">
                <div className="chat_item_name">{item.title}</div>
                <div className="chat_item_date">{time}</div>
          </div>
          <div className="chat_item_line">
                <div className="chat_item_lastmsg">
                 <p>
              {item.lastmessage}
                </p>
            
            </div>
          </div>
        </div>
    </div>
  )
}

export default ChatItem;