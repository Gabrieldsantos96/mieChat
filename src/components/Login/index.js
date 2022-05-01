import './styles.css';
import useData from '../../hooks/useData';

function Login () {
const { handleFacebookLogin} = useData();
return (

   <div className='login'>
      <button onClick={handleFacebookLogin}>Logar com Facebobok</button>
   </div>
)
}

export default Login;