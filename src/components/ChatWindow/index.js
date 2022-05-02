import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';
import useData from '../../hooks/useData';
import MessageItem from '../MessageItem';
import './styles.css';
import {useEffect,useRef} from 'react';
import Api from '../../api';

function ChatWindow() {
  const { showEmoji, 
    text,
    setText,
    user,
    listening,
    messages,
    activeChat,
    setMessages,
    setUsers,
    users,
    handleEmojiClick,
    handleOpenEmoji,
    handleSendClick,
    handleMicClick,
    handleInputKeyUp
    } = useData();

    const body = useRef();

    useEffect(() => {
      setMessages([]);
      let unsub = Api.onChatContent(activeChat.chatId,setMessages,setUsers);
      return unsub;

    },[activeChat.chatId]);

    useEffect(() => {
      if(body.current.scrollHeight > body.current.offsetHeight) { // o conteudo do body é maior que a altura do próprio body?
          body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight; // tamanho do conteudo do body - o valor disponível;
      }
    },[messages])
   return (
     <div className="chat_window">
       <div className="chat_window_header">

            <div className="chat_window_header_info">
                <img  className="chat_window_header_avatar"src={activeChat.image} alt=""/>
                <div className='chat_window_header_name'> {activeChat.title} - {activeChat.chatId}</div>
            </div>

          <div className='chat_window_header_buttons'>
            
          <div className="chat_window_btn">
              <SearchIcon style={{color: '#919191'}}/>
          </div>

          <div className="chat_window_btn">
              <AttachFileIcon style={{color: '#919191'}}/>
          </div>

          <div className="chat_window_btn">
              <MoreVertIcon style={{color: '#919191'}}/>
          </div>

          </div>

       </div>
       <div  ref={body} className="chat_window_main">
    {
      messages.map((item,key) => (
        <MessageItem
          key={key}
          item={item}
          user={user}
          
        />
      ))
    }
       </div>

       <div className="chat_window_emojiarea" 
       style={{height: showEmoji ? '200px' : '0px'}}>
         <EmojiPicker
         onEmojiClick={handleEmojiClick}
         disableSearchBar
         disableSkinTonePicker
         />
       </div>

       <div className="chat_window_footer">

        <div className="chat_window_pre">

        <div className="chat_window_btn"
        onClick={handleOpenEmoji}>
              <InsertEmoticonIcon style={{color: showEmoji ? '#009688' : "#919191"}}/>
          </div>

        </div>
        <div className="chat_window_inputarea">
          <input 
           type="text" 
           className="chat_window_input"
           placeholder='Digite uma mensagem'
           value={text}
           onChange={(e) => setText(e.target.value)}
           onKeyUp={handleInputKeyUp}
           >
          </input>

        </div>
        <div className="chat_window_pos">
        </div>
        { text ? <div className="chat_window_btn" onClick={handleSendClick}>
              <SendIcon style={{color: '#919191'}}/>
          </div> :
          <div className="chat_window_btn" onClick={handleMicClick}>
          <MicIcon style={{color: listening ? "#126ece" :' #919191'}}/>
      </div>

         }

        

        

        
       </div>
     </div>

   )
}

export default ChatWindow;