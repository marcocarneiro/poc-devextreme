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
import 'whatwg-fetch';
import CustomStore from 'devextreme/data/custom_store';
import { createStore } from 'devextreme-aspnet-data-nojquery'
import { traducao } from "../helpers/Traducao"
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
traducao()

const URL = 'http://localhost:8800'


const handleErrors = (response) => {
  if (!response.ok)
      throw Error(response.statusText);
  return response;
}


const notesEditorOptions = { height: 100 }

interface Book {
  titulo: string;
  descricao: string;
  preco: string;
  capa: string;
}
const books: Book[] = [];


const CrudDataGrid = () => {
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
        .then(handleErrors);
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

  const pasteContent = () => {
    // se o navegador não suporta o acesso ao clipboard, nada faz
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.readText()
      .then((conteudo) => {
        //Trata o conteúdo do clipboard, se for compatível
        trataDados(conteudo)
      })
      .catch((erro) => {
        console.error("Erro ao acessar o conteúdo do clipboard:", erro);
      });

  };
  const trataDados = (pastedData: string) => {
    const data: string = pastedData;
    const rows: string[] = data.split('\n');
    const books: { titulo: string, descricao: string, preco: string, capa: string }[] = [];
    
    for (const y in rows) {
      const cells: string[] = rows[y].split('\t');
      // Remover o caractere '\r' da última célula, se presente
      cells[cells.length - 1] = cells[cells.length - 1].replace(/\r$/, '');
  
      if (cells.length > 1) {
        books.push({ 'titulo': cells[0], 'descricao': cells[1], 'preco': cells[2], 'capa': cells[3] });
      }
    } 

    //
    const novoDataSource = new CustomStore({
      key: 'id',
      load: () => fetch(`${URL}/books`),
      insert: books => {
        return fetch(`${URL}/insertbook`, {
          method: 'POST',
          body: JSON.stringify(books),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(handleErrors);
      }
    });

    // Atualize o estado com o novo dataSource
    setDataSource(novoDataSource);
    console.log(books);
  }

  
  return(
    <>
      <IconButton aria-label="contentcopy" onClick={pasteContent}>
          <ContentCopyIcon />
      </IconButton>
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
    </>
  )
}
export default CrudDataGrid

/*
  EXEMPLO DO CHATGPT
  import React, { useState } from 'react';
import DataGrid, { Column, Editing, Paging, Pager, PagingProps } from 'devextreme-react/data-grid';

const App = () => {
  // 1. Criar um estado para armazenar os dados do DataGrid
  const [data, setData] = useState([
    { id: 1, name: 'John', age: 30 },
    { id: 2, name: 'Jane', age: 25 }
  ]);

  // Função para adicionar uma nova linha
  const addRow = () => {
    const newData = [...data];
    const newId = data.length + 1;
    newData.push({ id: newId, name: 'New Name', age: 0 }); // Adicionar uma nova linha com valores padrão
    setData(newData);
  };

  // 2. Definir a estrutura das colunas do DataGrid
  const columns: Column[] = [
    { dataField: 'id', caption: 'ID' },
    { dataField: 'name', caption: 'Name' },
    { dataField: 'age', caption: 'Age' }
  ];

  return (
    <div>
      <button onClick={addRow}>Adicionar Nova Linha</button>
      <DataGrid
        dataSource={data}
        showBorders={true}
      >
        {columns.map((column, index) => (
          <Column key={index} {...column} />
        ))}
        <Editing
          mode="row"
          allowAdding={false} // Desativar a adição de novas linhas por edição direta
          allowDeleting={true}
          allowUpdating={true}
        />
        <Paging defaultPageSize={10} />
        <Pager
          showPageSizeSelector={true}
          allowedPageSizes={[5, 10, 20]}
          showInfo={true}
        />
      </DataGrid>
    </div>
  );
};

export default App;




  */
