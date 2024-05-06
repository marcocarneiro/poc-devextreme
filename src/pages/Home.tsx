//Recursos CSS
import '../App.css';
import 'devextreme/dist/css/dx.light.css';
import { HeaderOrange, BlueDGIcons, CustomToolBar } from '../components/helpers/Estilos';

//Componentes
//import CrudDataGridArray from '../components/base/CrudDataGridArray';
//import CrudDataGrid from '../components/base/CrudDataGrid';
//import DataGridCopyPaste from '../components/base/DataGridCopyPaste';
//import DataGridHScroll from '../components/DataGridHScroll';
//import DataGridParams from '../components/DataGridParams';
//import DgGroupTotals from '../components/DgGroupTotals';
//import FullDataGrid from '../components/base/FullDataGrid';
import DataGridTest from '../components/base/DataGridTest';


const Home = () => {
    return(
        <HeaderOrange>
            <BlueDGIcons>
                <CustomToolBar>
                    <DataGridTest />
                </CustomToolBar>                
            </BlueDGIcons>             
        </HeaderOrange>                           
    )    
}

export default Home