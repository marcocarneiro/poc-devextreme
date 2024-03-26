import React, { useCallback, useState } from 'react'
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Form,
} from 'devextreme-react/data-grid'
import 'devextreme-react/text-area'
import { Item } from 'devextreme-react/form'
/* import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source'; */
import 'whatwg-fetch';
import { createStore } from 'devextreme-aspnet-data-nojquery'
import { BlueDGIcons } from '../components/helpers/Estilos'
import { traducao } from "./helpers/Traducao"
traducao()

const URL = 'http://localhost:8800'

function handleErrors(response) {
  if (!response.ok)
      throw Error(response.statusText);
  return response;
}

const dataSource = createStore({
  key: 'id',
  insertMethod: 'POST',
  updateMethod: 'PUT',
  deleteMethod: 'DELETE',
  loadMethod : 'GET',
  loadUrl: `${URL}/books`,
  insertUrl: `${URL}/insertbook`,
  updateUrl: `${URL}/updatebook/:id`,
  deleteUrl: `${URL}/delbook/:id`,
  onBeforeSend: (method, ajaxOptions) => {
    ajaxOptions.headers = {'content-type':'application/json'}
  },

  onInserting: (values) => {
    return fetch(`${URL}/insertbook`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(handleErrors)
  },

  onUpdating(key, values) {
    fetch(`${URL}/updatebook/${key}`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(updatedData => {
        console.log('Data updated:', updatedData);
      })
      .catch(error => {
        console.error('Error updating data:', error);
    })
  },

  onRemoving(key) {
    fetch(`${URL}/delbook/${key}`, { 
       method: 'DELETE'})
       .then(response => {  
        console.log(response.status)
    })
  },
})

const notesEditorOptions = { height: 100 }

const CrudDataGrid = () => {
  return(
    <BlueDGIcons>
      <DataGrid dataSource={dataSource} showBorders={true} repaintChangesOnly={true} >
        <Paging enabled={false} />
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}>
          <Popup title="Informações do Usuário" showTitle={true} width={700} height={525} />
          <Form>
            <Item itemType="group" colCount={2} colSpan={2} />
            <Item dataField="title" />            
            <Item dataField="price" />
            <Item dataField="desc" editorType="dxTextArea" colSpan={2} editorOptions={ notesEditorOptions } />
            <Item dataField="cover" />
            
          </Form>
        </Editing>

        <Column dataField="title" caption="TÍTULO"  />
        <Column dataField="desc" caption="DESCRIÇÃO" />
        <Column dataField="price" caption="PREÇO" />
        <Column dataField="cover" caption="CAPA" />        
      </DataGrid>      
    </BlueDGIcons>
  )
}
export default CrudDataGrid

/* const CrudDataGrid = () => {
  return(
      <Estilo>
        <DataGrid
          dataSource={dataSource}
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

export default CrudDataGrid */