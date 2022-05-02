import './styles.css';
import Sidebar from '../../components/Sidebar';
import Content from '../../components/Content';
import { useEffect } from 'react';
import Api from '../../api';
import useData from '../../hooks/useData';
import { getItem } from '../../localStorage';


function Home () {

const { user,setContacts,setChatlist} = useData();

   useEffect(() => {
      const userId = getItem('token');
      const getList = async () => {
         let results = await Api.getContactList(userId);
         let localAux = results;
         console.log(localAux);
         setContacts(localAux);
      }
      getList();

      if(user !== null ) {
         let unsub = Api.onChatList(user.id,setChatlist)
         return unsub;
      }  
      
   },[])
  
   return (
      <div className="app_window">
         <Sidebar/>
         <Content/>
      </div>
   )
}

export default Home;