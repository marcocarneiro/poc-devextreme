/** Importação de componentes e recursos  **/
import React, { useState } from 'react';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Form,
  Toolbar, Item
} from 'devextreme-react/data-grid';
import { Item as FormItem } from 'devextreme-react/form';
import 'devextreme-react/text-area';
import 'whatwg-fetch';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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

  const addNewRow = () => {
    alert('ABRIR MODAL!!')
  };

  return (
    <div className="grid-container">
      <DataGrid key={forceUpdate} dataSource={dataSource} showBorders={true} repaintChangesOnly={true}>
        <Toolbar>
          <Item>
            <Button onClick={addNewRow} variant="outlined"><AddIcon /></Button>
          </Item>
          <Item>
            <ButtonCopyPasteFromExcel onDataInserted={onDataInserted} />
          </Item>          
        </Toolbar>

        <Paging enabled={true} defaultPageSize={10} />
        
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={false} // Desabilitando a adição de novos itens através do componente Editing
          allowDeleting={true} />

        <Popup title="Informações do Usuário" showTitle={true} width={700} height={525} />
        <Form>
          <FormItem itemType="group" colCount={2} colSpan={2} />
          <FormItem dataField="title" />            
          <FormItem dataField="price" />
          <FormItem dataField="desc" editorType="dxTextArea" colSpan={2} editorOptions={ notesEditorOptions } />
          <FormItem dataField="cover" />          
        </Form>

        <Column dataField="title" caption="TÍTULO"  />
        <Column dataField="desc" caption="DESCRIÇÃO" />
        <Column dataField="price" caption="PREÇO" />
        <Column dataField="cover" caption="CAPA" />     
      </DataGrid>
    </div>
  )
}

export default DataGridTest;


/*

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


import { traducao } from "../helpers/Traducao";
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
    <div className="grid-container">
      <ButtonCopyPasteFromExcel onDataInserted={onDataInserted} /> 
      <DataGrid key={forceUpdate} dataSource={dataSource} showBorders={true} repaintChangesOnly={true}>
        <Paging enabled={true} defaultPageSize={10} />
        
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
    </div>
  )
}

export default DataGridTest;

*/
