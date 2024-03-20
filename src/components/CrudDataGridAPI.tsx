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

import CustomStore from 'devextreme/data/custom_store'
import DataSource from 'devextreme/data/data_source'
import 'whatwg-fetch'

//const url = 'https://jsonplaceholder.typicode.com/comments/'
/* const dataSource = createStore(
    {
        key: 'id',
        loadUrl: url,
    }
) */
const URL = 'https://jsonplaceholder.typicode.com/posts/1/comments'

function isNotEmpty(value: string | undefined | null) {
    return value !== undefined && value !== null && value !== '';
  }
  
  const datasource = new CustomStore({
    key: 'OrderNumber',
    async load(loadOptions) {
      const paramNames = [
        'skip', 'take', 'requireTotalCount', 'requireGroupCount',
        'sort', 'filter', 'totalSummary', 'group', 'groupSummary',
      ];
  
      const queryString = paramNames
        .filter((paramName) => isNotEmpty(loadOptions[paramName]))
        .map((paramName) => `${paramName}=${JSON.stringify(loadOptions[paramName])}`)
        .join('&');
  
      try {
        const response = await fetch(`https://js.devexpress.com/Demos/WidgetsGalleryDataService/api/orders?${queryString}`);
  
        const result = await response.json();
  
        return {
          data: result.data,
          totalCount: result.totalCount,
          summary: result.summary,
          groupCount: result.groupCount,
        };
      } catch (err) {
        throw new Error('Data Loading Error');
      }
    },
  });

const notesEditorOptions = { height: 100 };

const CrudDataGridAPI = () => (
  <div id="data-grid-demo">
    <Estilo>
      <DataGrid
        dataSource={datasource}
        //keyExpr="id"
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
              <Item dataField="OrderNumber" />
              <Item dataField="OrderDate" />
              <Item dataField="StoreCity" />
              <Item dataField="StoreState" />
              <Item dataField="Employee" />
              <Item dataField="SaleAmount" />
              <Item
                dataField="body"
                editorType="dxTextArea"
                colSpan={2}
                editorOptions={notesEditorOptions} />
            </Item>
          </Form>
        </Editing>
        <Column
      dataField="OrderNumber"
      dataType="number"
    />
    <Column
      dataField="OrderDate"
      dataType="date"
    />
    <Column
      dataField="StoreCity"
      dataType="string"
    />
    <Column
      dataField="StoreState"
      dataType="string"
    />
    <Column
      dataField="Employee"
      dataType="string"
    />
    <Column
      dataField="SaleAmount"
      dataType="number"
      format="currency"
    />
      </DataGrid>
    </Estilo>
  </div>
)

export default CrudDataGridAPI
