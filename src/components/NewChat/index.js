import './styles.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import useData from '../../hooks/useData';

function NewChat () {
   const { contacts,showNewChat,setShowNewChat,user,chatlist,addNewChat} = useData();
   return (
<div className="new_chat" style={{left: showNewChat? 0 : -415}}>
   <div className="new_chat_head">
      <div className="new_chat_backbutton" onClick={() => setShowNewChat(false)}>
         <ArrowBackIcon style={{color: "FFF"}}/>
      </div>
      <div className="new_chat_headTittle">Nova Conversa</div>
   </div>
   <div className="new_chat_list">
      {
         contacts.map((item,key) => (
            <div onClick={() => addNewChat(item)}className="new_chat_item" key={key}>
               <img  className="new_chat_item_avatar" src={item.avatar} alt=""/>
               <div className="new_chat_item_name">{item.name}</div>
           </div>
   ))
      }
   </div>
</div>
   )
}
export default NewChat;