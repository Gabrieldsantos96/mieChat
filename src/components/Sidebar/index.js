import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ChatItem from '../../components/ChatItem';
import useData from '../../hooks/useData';
import NewChat from '../../components/NewChat';
import './styles.css';

function Sidebar() {
  const {
chatlist,setActiveChat,activeChat,setShowNewChat
,user  } = useData();

  return (
    <div className="sidebar">
      <NewChat/>
     <header>
        <img
        className='header_avatar'
         src={user ? user.avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7WfE6wFfdpeFph92LdEFJFnula0ecIObiQ&usqp=CAU'}
          alt=""/>

          <div className='header_buttons'>
              <div className="header_btn">
                <DonutLargeIcon style={{color: '#919191'}} />
              </div>

              <div className="header_btn">
                <ChatIcon style={{color: '#919191'}} onClick={() => setShowNewChat(true)}/>
              </div>

              <div className="header_btn">
                <MoreVertIcon style={{color: '#919191'}} />
              </div>

          </div>
     </header>

     <div className="search">
        <div className="search_input">

        <SearchIcon fontSize="small" style={{color: '#919191'}} />
        <input type="search" placeholder='Procurar ou começar uma nova conversa'/>
        
        </div>
     </div>

     <div className="chat_list">
          {
            chatlist.map((item,key) => (
            <ChatItem
            onClick={() => setActiveChat(chatlist[key])}
            key={key}
            item={item}
            active={activeChat.chatId ===chatlist[key].chatId}
            />
            ))
          }
     </div>

    </div>

    
  );
}

export default Sidebar;
