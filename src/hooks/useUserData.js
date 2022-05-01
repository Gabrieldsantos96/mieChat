import { useRef, useState ,useEffect} from "react";
import Api from '../api';
import { setItem } from "../localStorage";
import { useNavigate } from 'react-router-dom';

        export function useUserData(){
          const [chatlist, setChatlist] = useState([
                {chatId:1, title: 'Fulano de tal', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7WfE6wFfdpeFph92LdEFJFnula0ecIObiQ&usqp=CAU'},
                {chatId:2, title: 'Fulano de 2', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7WfE6wFfdpeFph92LdEFJFnula0ecIObiQ&usqp=CAU'},
                {chatId:3, title: 'Fulano de 3', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7WfE6wFfdpeFph92LdEFJFnula0ecIObiQ&usqp=CAU'},
                {chatId:4, title: 'Fulano de 4', image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7WfE6wFfdpeFph92LdEFJFnula0ecIObiQ&usqp=CAU'},
            ]);
            const [user,setUser] = useState(null);
            const [activeChat,setActiveChat] = useState({});
            const [showEmoji,setShowEmoji] = useState(false);
            const [showNewChat,setShowNewChat] = useState(false);
            const [text,setText] = useState("");
            const [listening,setListening] = useState(false);
            const [contacts,setContacts] = useState([
                {id: 123, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7WfE6wFfdpeFph92LdEFJFnula0ecIObiQ&usqp=CAU", name: 'Mauro'},
                {id: 2, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7WfE6wFfdpeFph92LdEFJFnula0ecIObiQ&usqp=CAU", name: 'Dani'},
                {id: 3 ,avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7WfE6wFfdpeFph92LdEFJFnula0ecIObiQ&usqp=CAU", name: 'Mateus'},
                {id: 1, avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo7WfE6wFfdpeFph92LdEFJFnula0ecIObiQ&usqp=CAU", name: 'gasbs'},

            ])
            const [messages,setMessages] = useState([
                {author:123,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:1234,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:1234,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:1234,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:1234,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:1234,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:1234,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:1234,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:123,body: 'blalblblbla'},
                {author:1234,body: 'blalblblbla'}]);

            let recognition = null;
            let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;

            if(speechRecognition !== undefined) {
                recognition = new speechRecognition();
            }

            const handleFacebookLogin = async () => {
                const result = await Api.fbPopup();
                if(result) {
                   handleLoginData(result.user);
          
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
                  setUser(newUser);
                  setItem('token', u.uid);
                 
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
        handleEmojiClick,
        handleOpenEmoji,
        handleMicClick,
        handleSendClick,
        handleFacebookLogin,
        handleLoginData
    }
}