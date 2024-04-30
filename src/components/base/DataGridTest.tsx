// Componente DataGridTest
import React, { useCallback, useState } from 'react';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Form,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import 'whatwg-fetch';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { traducao } from "../helpers/Traducao";
import ButtonCopyPasteFromExcel from './ButtonCopyPasteFromExcel';
traducao();

const URL = 'http://localhost:8800';

const handleErrors = (response) => {
  if (!response.ok)
    throw Error(response.statusText);
  return response;
}

const notesEditorOptions = { height: 100 };

interface Book {
  title: string;
  desc: string;
  price: string;
  cover: string;
}

const DataGridTest = () => {
  const [dataSource, setDataSource] = useState(createStore({
    key: 'id',
    insertMethod: 'POST',
    updateMethod: 'PUT',
    deleteMethod: 'DELETE',
    loadMethod: 'GET',
    loadUrl: `${URL}/books`,
    insertUrl: `${URL}/insertbook`,
    updateUrl: `${URL}/updatebook/:id`,
    deleteUrl: `${URL}/delbook/:id`,
    onBeforeSend: (method, ajaxOptions) => {
      ajaxOptions.headers = { 'content-type': 'application/json' };
    },
    onInserting: values => {
      return fetch(`${URL}/insertbook`, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(handleErrors)
        .then(() => {
          setDataSource(prevDataSource => {
            prevDataSource.load();
            return prevDataSource;
          });
        });
    },
    onUpdating: (key, values) => {
      // Implementação do onUpdating...
    },
    onRemoving: key => {
      // Implementação do onRemoving...
    }
  }));

  const [forceUpdate, setForceUpdate] = useState(false); // Estado local para forçar a atualização do componente

  const onDataInserted = () => {
    setForceUpdate(prevForceUpdate => !prevForceUpdate); // Forçando a atualização do componente após a inserção dos dados
  };

  return (
    <>
      <ButtonCopyPasteFromExcel onDataInserted={onDataInserted} /> 
      <DataGrid key={forceUpdate} dataSource={dataSource} showBorders={true} repaintChangesOnly={true}>
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
    </>
  )
}

export default DataGridTest;
