import '../App.css'
import 'devextreme/dist/css/dx.light.css'
import CrudDataGridAPI from '../components/CrudDataGridAPI'
import SimpleDataGrid from '../components/SimpleDataGrid'
import TestDataGridCrud from '../components/TestDataGridCrud'

//TESTAR A API COM OUTRA CAMADA DE DADOS - NÃO UTILIZAR createStore()
const Home = () => {
    return(
        <CrudDataGridAPI />
    )    
}

export default Home