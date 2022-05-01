import './styles.css';
import Sidebar from '../../components/Sidebar';
import Content from '../../components/Content';


function Home () {
  
   return (
      <div class="app_window">
         <Sidebar/>
         <Content/>
      </div>
   )
}

export default Home;