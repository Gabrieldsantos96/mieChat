import './styles.css';
import Login from '../../components/Login';
import {useEffect} from 'react';
import { getItem } from '../../localStorage';
import { useNavigate } from 'react-router-dom';


function LoginPage () {
const navigate = useNavigate();

   useEffect(() => {
      const token = getItem('token');
        
      if (token) {
        navigate('/')
      }
    },[]);
    
   return (
     <Login/>
   )
}

export default LoginPage;