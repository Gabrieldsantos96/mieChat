import './styles.css';

function ChatItem ({onClick,active,item}) {
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
                <div className="chat_item_date">28/10/19</div>
          </div>
          <div className="chat_item_line">
                <div className="chat_item_lastmsg">
                 <p>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat in dolores dolorem nobis eum id rerum praesentium. Itaque fugiat nihil quod. Nobis nam alias facere eveniet temporibus! Nostrum, ratione iste.
                </p>
            
            </div>
          </div>
        </div>
    </div>
  )
}

export default ChatItem;