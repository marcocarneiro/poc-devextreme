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

//const refreshModeLabel = { 'aria-label': 'Refresh Mode' }
const URL = 'https://65fc290814650eb2100bafbe.mockapi.io/usuarios/v1/users'
//https://github.com/mockapi-io/docs/wiki/Code-examples
//const REFRESH_MODES = ['full', 'reshape', 'repaint']

const dataSource = createStore({
  key: 'id',
  loadUrl: `${URL}`,
  /* insertUrl: `${URL}`,
  updateUrl: `${URL}`,
  deleteUrl: `${URL}`,*/ 
  onBeforeSend: (loadUrl, ajaxOptions) => {
    ajaxOptions.headers = {'content-type':'application/json'}
  }, 
})

const CrudDataGridAPI = () => {
  //VER ESTE EXEMPLO:  https://js.devexpress.com/React/Demos/WidgetsGallery/Demo/DataGrid/WebAPIService/Light/
  return(
      <Estilo>
        <DataGrid
          dataSource={dataSource}
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
              <Item dataField="avatar" />
              {/* <Item dataField="id" /> */}
              <Item dataField="name" />
              <Item dataField="nascimento" />
              <Item dataField="cargo" />
              <Item dataField="createdAt" />
            </Form>
          </Editing>
          <Column dataField="avatar" caption="Avatar"  />
          <Column dataField="id" caption="ID" />
          <Column dataField="name" caption="Nome" />
          <Column dataField="nascimento" dataType="date" caption="Nascimento:" />
          <Column dataField="cargo" caption="Cargo" />
          <Column dataField="createdAt" dataType="date" caption="Admissão em:" />
        </DataGrid>
      </Estilo>
  )  
}

export default CrudDataGridAPI