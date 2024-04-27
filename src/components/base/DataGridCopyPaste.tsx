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
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
traducao();

const URL = 'http://localhost:8800';

const handleErrors = (response) => {
  if (!response.ok)
    throw Error(response.statusText);
  return response;
}

const notesEditorOptions = { height: 100 };

interface Book {
  titulo: string;
  descricao: string;
  preco: string;
  capa: string;
}

const DataGridCopyPaste = () => {
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

  const [forceUpdate, setForceUpdate] = useState(false); // Estado local para forçar a atualização do componente

  const pasteContent = () => {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.readText()
      .then((conteudo) => {
        trataDados(conteudo)
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  const trataDados = (pastedData: string) => {
    const data: string = pastedData;
    const rows: string[] = data.split('\n');
    const books: { title: string, desc: string, price: string, cover: string }[] = [];
    
    for (const y in rows) {
      const cells: string[] = rows[y].split('\t');
      cells[cells.length - 1] = cells[cells.length - 1].replace(/\r$/, '');
  
      if (cells.length > 1) {
        books.push({ 'title': cells[0], 'desc': cells[1], 'price': cells[2], 'cover': cells[3] });
      }
    }
    atualizaBDArray(books);   
  }
  
  const atualizaBDArray = async (dados: Book[]): Promise<void> => {
    for (const livro of dados) {
      try {
        const response = await fetch(`${URL}/insertbook`, {
          method: 'POST',
          body: JSON.stringify(livro),
          headers: {
            'Content-Type': 'application/json'
          }
        });
  
        if (!response.ok) {
          throw new Error('Erro ao salvar os dados no servidor.');
        }
  
        const responseData = await response.json();
        console.log('Livro inserido com sucesso:', responseData);
      } catch (error) {
        console.error('Erro ao inserir livro:', error);
      }
    }

    // Atualiza o estado local para forçar a atualização do componente
    setForceUpdate(prevState => !prevState);
  };

  return (
    <>
      <IconButton aria-label="contentcopy" onClick={pasteContent}>
          <ContentCopyIcon />
      </IconButton>
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

export default DataGridCopyPaste;

