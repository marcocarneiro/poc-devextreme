/** Importação de componentes e recursos  **/
import React, { useState } from 'react';
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
import ButtonCopyPasteFromExcel from './ButtonCopyPasteFromExcel';

/** Importação do helper de tradução e ativação da tradução da UI */
import { traducao } from "../helpers/Traducao";
traducao();

/** URL da API (importante: Substituir abordagem por VARIÁVEL DE AMBIENTE) */
const URL = 'http://localhost:8800';

/** Função para msg de erro na rotina de INSERTING */
const handleErrors = (response) => {
  if (!response.ok)
    throw Error(response.statusText);
  return response;
}

/** Definição da altura do Textfield no formulário de inserção de dados */
const notesEditorOptions = { height: 100 };

/** Definição do objeto Book com os tipos de dados, geralmente usado no BD */
interface Book {
  title: string;
  desc: string;
  price: string;
  cover: string;
}

/** Declaração do componente DataGridTest */
const DataGridTest = () => {
  const [dataSource, setDataSource] = useState(createStore({ //método createStore atribuído a um STATE
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
      return fetch(`${URL}/updatebook/${key}`, {
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
        });
    },
    onRemoving: key => {
      return fetch(`${URL}/delbook/${key}`, {
        method: 'DELETE'
      }).then(response => {
        console.log(response.status);
      });
    }
  }));

  const [forceUpdate, setForceUpdate] = useState(false); // Estado local para forçar a atualização do componente

  const onDataInserted = () => { // Forçando a atualização do componente após a inserção dos dados - UTILIZADO PELO BOTÃO
    setForceUpdate(prevForceUpdate => !prevForceUpdate);
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
