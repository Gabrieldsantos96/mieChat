import './styles.css';
import intro_img from '../../assets/loading_intro.png';

function ChatIntro() {
 return (
   <div className="chat_intro">
    <img src={intro_img} alt=""/>
      <h1>Mantenha seu celular conectado</h1>
      <h2> O WhatsApp conecta ao seu telefone para sincronizar suas mensagens.<br></br>
      Para reduzir o uso de dados, conecte seu telefone a uma rede Wi-Fi.</h2>
   </div>
 ) 
}

export default ChatIntro;