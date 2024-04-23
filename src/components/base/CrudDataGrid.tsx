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
        return response.json()
        console.log(values)
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

////////// UTILIZAR EM NOVO COMPONENTE
const pasteContent = () => {
  // e o navegador não suporta o acesso ao clipboard, nada faz
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
}

interface Book {
  titulo: string;
  descricao: string;
  preco: string;
  capa: string;
}

const books: Book[] = [];
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
  console.log(books);
}
//Se basear neste exemplo de função para implementar as novas linhas no datagrid
//utilizar no lugar do trecho console.log(books);
/*
function bindGrid(){
  $("#gridContainer").dxDataGrid({
        dataSource: customers,
        columns: ["FirstName", "LastName", "Age", "Email"],
        showBorders: true
    });
}
*/
////////// UTILIZAR EM NOVO COMPONENTE - FIM BLOCO


const CrudDataGrid = () => {
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
