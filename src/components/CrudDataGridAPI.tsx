import React from 'react'
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Form,
} from 'devextreme-react/data-grid'
import { createStore } from 'devextreme-aspnet-data-nojquery'
import 'devextreme-react/text-area'
import { Item } from 'devextreme-react/form'
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

const handleErrors = (response: Response): Response =>{
    if (!response.ok)
        throw new Error(response.statusText)
    return response
}
/* function handleErrors(response: Response): Response {
    if (!response.ok)
        throw new Error(response.statusText);
    return response;
} */

const url = 'https://jsonplaceholder.typicode.com/comments/'
const dataSource = createStore(
    {
        key: 'id',
        loadUrl: url,
        insert: (values) => {
            return fetch("https://mydomain.com/MyDataService/myEntity", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(handleErrors);
        }
    }
)

const notesEditorOptions = { height: 100 };

const CrudDataGridAPI = () => (
  <div id="data-grid-demo">
    <Estilo>
      <DataGrid
        dataSource={dataSource}
        keyExpr="id"
        showBorders={true}
      >
        <Paging enabled={false} />
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}>
          <Popup title="Comentários" showTitle={true} width={700} height={525} />
          <Form>
            <Item itemType="group" colCount={2} colSpan={2}>
              <Item dataField="postId" />
              <Item dataField="id" />
              <Item dataField="name" />
              <Item dataField="email" />
              <Item
                dataField="body"
                editorType="dxTextArea"
                colSpan={2}
                editorOptions={notesEditorOptions} />
            </Item>
          </Form>
        </Editing>
        <Column dataField="postId"  />
        <Column dataField="id" />
        <Column dataField="name" />
        <Column dataField="email" />
        <Column dataField="body" />
      </DataGrid>
    </Estilo>
  </div>
)

export default CrudDataGridAPI
