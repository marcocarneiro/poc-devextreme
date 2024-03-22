import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Form,
} from 'devextreme-react/data-grid'
import 'devextreme-react/text-area'
import { Item } from 'devextreme-react/form'
import { createStore } from 'devextreme-aspnet-data-nojquery'
import styled from '@emotion/styled'


//Pacotes de tradução
import ptMessages from "devextreme/localization/messages/pt.json"
import { locale, loadMessages } from "devextreme/localization"
loadMessages(ptMessages)
locale(navigator.language)

//Estilo para exibir ícones na coluna de edição
const Estilo = styled.div`
.dx-link {
  text-indent: 50000px;  
  background-size: 24px 24px;
  height: 24px;
  width: 24px;
  margin-left: 16px;
  background-color: #07f;
}
.dx-link:hover {
  background-color: #aaa;
}
.dx-link-edit{  
  background-repeat: none;
  -webkit-mask-image: url('./edit_black_24dp.svg');
  mask-image: url('./edit_black_24dp.svg');  
}
.dx-link-delete{
  background-repeat: none;
  -webkit-mask-image: url('./delete_black_24dp.svg');
  mask-image: url('./delete_black_24dp.svg');
}
`
const URL = 'https://gorest.co.in/public/v2/users'

const dataSource = createStore({
  key: 'id',
  loadUrl: `${URL}`,
  /* insertUrl: `${URL}`,
  updateUrl: `${URL}/2139284`,
  deleteUrl: `${URL}`,*/ 
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.headers = {'content-type':'application/json'}
    //ajaxOptions.headers = {'Authorization': 'Bearer 18c4ec7903c951afd3da65094a6830cb0460bfb77b7d899cb4327c78a9056d1d'}
  }, 
})

const teste = createStore({
  key: 'id',
  insertMethod: 'Post',
  updateMethod: 'Put',
  deleteMethod: 'Delete',
  loadUrl: `${URL}`,
  insertUrl: `${URL}`,
  updateUrl: `${URL}/2139284`,
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.headers = {'content-type':'application/json'}
    ajaxOptions.headers = {'Authorization': 'Bearer 18c4ec7903c951afd3da65094a6830cb0460bfb77b7d899cb4327c78a9056d1d'}
    ajaxOptions.headers = {'Access-Control-Allow-Origin': '*'}
    ajaxOptions.headers = {'Access-Control-Allow-Methods': 'GET, POST, PUT'}
  }
})

const CrudDataGridAPI = () => {
  //VER ESTE EXEMPLO:  https://js.devexpress.com/React/Demos/WidgetsGallery/Demo/DataGrid/WebAPIService/Light/
  return(
      <Estilo>
        <DataGrid
          dataSource={teste}
          /* keyExpr="id" */
          showBorders={true}
        >
          <Paging enabled={false} />
          <Editing
            mode="popup"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}>
            <Popup title="Informações do Usuário" showTitle={true} width={700} height={525} />
            <Form>
              <Item itemType="group" colCount={2} colSpan={2} />
              <Item dataField="name" />
              {/* <Item dataField="id" /> */}
              <Item dataField="email" />
              <Item dataField="gender" />
              <Item dataField="status" />
            </Form>
          </Editing>          
          <Column dataField="id" caption="ID"  />
          <Column dataField="name" caption="NOME" />
          <Column dataField="email" caption="EMAIL" />
          <Column dataField="gender" caption="SEXO" />
          <Column dataField="status" caption="STATUS" />
        </DataGrid>
      </Estilo>
  )  
}

export default CrudDataGridAPI