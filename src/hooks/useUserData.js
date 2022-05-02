import { useRef, useState ,useEffect} from "react";
import Api from '../api';
import { setItem,getItem } from "../localStorage";
import { useNavigate } from 'react-router-dom';

        export function useUserData(){
          const navigate = useNavigate();
          const [chatlist, setChatlist] = useState([]);
            const [user,setUser] = useState(null);
            const [activeChat,setActiveChat] = useState({});
            const [showEmoji,setShowEmoji] = useState(false);
            const [showNewChat,setShowNewChat] = useState(false);
            const [text,setText] = useState("");
            const [listening,setListening] = useState(false);
            const [contacts,setContacts] = useState([])
            const [messages,setMessages] = useState([]);
            const [users,setUsers] = useState([]);

            let recognition = null;
            let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

            if(speechRecognition !== undefined) {
                recognition = new speechRecognition();
            }

            const handleFacebookLogin = async () => {
                const result = await Api.fbPopup();
                if(result) {
                   handleLoginData(result.user);
                    navigate('/')
                } else {
                   window.alert("Erro!");
                }
             }

             const handleLoginData = (u) => {
                const newUser = {
                  id: u.uid,
                  name: u.displayName,
                  avatar: u.photoURL
                };
                  Api.addUser(newUser);
                  setUser(newUser);
                  setItem('token', u.uid);
                  
                  console.log(user);
                 
                 
              }

            const handleEmojiClick = (e,emojiObject) => {
                setText(text + emojiObject.emoji);
              }
            
            const handleOpenEmoji = () => {
                showEmoji ? setShowEmoji(false) : setShowEmoji(true);
              }
            
              const handleMicClick = () => {
                if(recognition !== null) {
                    recognition.onstart = () => {
                        setListening(true)
                    }

                    recognition.onend = () => {
                        setListening(false)
                    }
                    recognition.onresult = (e) => {
                        setText(e.results[0][0].transcript);
                    }

                    recognition.start();
                }
              }
            
            const handleSendClick = () => {
                if(text !== '') {
                  Api.sendMessage(activeChat,user.id,'text',text,users);
                  setText('');
                  setShowEmoji(false);
                }
            }

          const handleInputKeyUp = (e) => {
              if(e.keyCode === 13) {
                handleSendClick();
              }
            }
            
            const addNewChat = async (user2) => {
              await Api.addNewChat(user,user2);

              setShowNewChat(false);
            }
      

    return {
        chatlist,
        setChatlist,
        user,
        setUser,
        contacts,
        setContacts,
        activeChat,
        setActiveChat,
        showEmoji,
        setShowEmoji,
        showNewChat,
        setShowNewChat,
        text,setText,
        listening,
        messages,
        users,
        setUsers,
        setMessages,
        handleEmojiClick,
        handleOpenEmoji,
        handleMicClick,
        handleSendClick,
        handleFacebookLogin,
        handleLoginData,
        addNewChat,
        handleInputKeyUp
    }
}