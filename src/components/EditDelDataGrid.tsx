import React from 'react';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Form,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form'
import styled from '@emotion/styled'

import { clientes, states } from './dados.ts'

//Pacotes de tradução
import ptMessages from "devextreme/localization/messages/pt.json"
import { locale, loadMessages } from "devextreme/localization"
loadMessages(ptMessages)
locale(navigator.language)

const Estilo = styled.div`
.dx-link {
  text-indent: 50000px;  
  background-size: 24px 24px;
  height: 24px;
  width: 24px;
  margin-left: 16px;
}
.dx-link-edit{
  background-image: url('./edit_black_24dp.svg');
  background-repeat: none;
}
.dx-link-delete{
  background-image: url('./delete_black_24dp.svg');
  background-repeat: none;
}
`

const notesEditorOptions = { height: 100 };

const EditDelDataGrid = () => (
  <div id="data-grid-demo">
    <Estilo>
      <DataGrid
        dataSource={clientes}
        keyExpr="ID"
        showBorders={true}
      >
        <Paging enabled={false} />
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}>
          <Popup title="Employee Info" showTitle={true} width={700} height={525} />
          <Form>
            <Item itemType="group" colCount={2} colSpan={2}>
              <Item dataField="FirstName" />
              <Item dataField="LastName" />
              <Item dataField="Prefix" />
              <Item dataField="BirthDate" />
              <Item dataField="Position" />
              <Item dataField="HireDate" />
              <Item
                dataField="Notes"
                editorType="dxTextArea"
                colSpan={2}
                editorOptions={notesEditorOptions} />
            </Item>

            <Item itemType="group" caption="Home Address" colCount={2} colSpan={2}>
              <Item dataField="StateID" />
              <Item dataField="Address" />
            </Item>
          </Form>
        </Editing>
        <Column dataField="Prefix" caption="Title" width={70} />
        <Column dataField="FirstName" />
        <Column dataField="LastName" />
        <Column dataField="BirthDate" dataType="date" />
        <Column dataField="Position" width={170} />
        <Column dataField="HireDate" dataType="date" />
        <Column dataField="StateID" caption="State" width={125}>
          <Lookup dataSource={states} valueExpr="ID" displayExpr="Name" />
        </Column>
        <Column dataField="Address" visible={false} />
        <Column dataField="Notes" visible={false} />
      </DataGrid>
    </Estilo>
  </div>
);

export default EditDelDataGrid;
