//Recursos CSS
import '../App.css'
import 'devextreme/dist/css/dx.light.css'
import { HeaderOrange, BlueDGIcons } from '../components/helpers/Estilos'

//Componentes
import CrudDataGrid from '../components/base/CrudDataGrid'
//import DataGridHScroll from '../components/DataGridHScroll'
//import DataGridParams from '../components/DataGridParams'
//import DgGroupTotals from '../components/DgGroupTotals'
//import FullDataGrid from '../components/base/FullDataGrid'


const Home = () => {
    return(
        <HeaderOrange>
            <BlueDGIcons>
                <CrudDataGrid />
            </BlueDGIcons>             
        </HeaderOrange>                           
    )    
}

export default Home