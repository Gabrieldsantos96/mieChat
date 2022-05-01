import './styles.css';
import ChatIntro from '../ChatIntro';
import ChatWindow from '../ChatWindow';
import useData from '../../hooks/useData';

function Content() {
const {
activeChat,setActiveChat
} = useData();
  return (
    <div className="content_area">

      {activeChat.chatId !== undefined &&
        <ChatWindow 
        />
      }
      {activeChat.chatId == undefined &&
        <ChatIntro/>
      }
      
    </div>
  );
}

export default Content;
