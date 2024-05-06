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

  const [forceUpdate, setForceUpdate] = useState(false); 

  const onDataInserted = () => { 
    setForceUpdate(prevForceUpdate => !prevForceUpdate);
  };

  return (
    <div className="grid-container" style={{ position: 'relative' }}>
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
      <div className="custom-toolbar">
        <ButtonCopyPasteFromExcel onDataInserted={onDataInserted} /> 
      </div>
    </div>
  )
}

export default DataGridTest;







/* import React, { useState } from 'react';
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

  const [forceUpdate, setForceUpdate] = useState(false); 

  const onDataInserted = () => { 
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