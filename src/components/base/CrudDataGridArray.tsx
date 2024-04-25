import React, { useCallback, useState, useEffect } from 'react';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Form,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import { traducao } from "../helpers/Traducao";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
traducao()

const URL = 'http://localhost:8800'

const notesEditorOptions = { height: 100 }

interface Book {
  title: string;
  desc: string;
  price: number;
  cover: string;
}

const CrudDataGrid = () => {
  const [dataSource, setDataSource] = useState<Book[]>([]);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/books`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setDataSource(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCopyContent = useCallback(() => {
    try {
      setBooks(prevBooks => [...prevBooks, ...dataSource]);
      console.log('Books copied:', books);
      // Aqui você pode adicionar lógica para manipular os livros copiados, se necessário
    } catch (error) {
      console.error('Error copying content:', error);
    }
  }, [books, dataSource]);

  return(
    <>
      <p>DataGridArray</p>
      <IconButton aria-label="contentcopy" onClick={handleCopyContent}>
          <ContentCopyIcon />
      </IconButton>
      <DataGrid dataSource={dataSource} showBorders={true} repaintChangesOnly={true}>

        <Paging enabled={false} />
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
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
export default CrudDataGrid;



/* import React, { useCallback, useState, useEffect } from 'react';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Form,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import { traducao } from "../helpers/Traducao";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
traducao()

const URL = 'http://localhost:8800'

interface Book {
  title: string;
  desc: string;
  price: number;
  cover: string;
}

const CrudDataGrid = () => {
  const [dataSource, setDataSource] = useState<Book[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${URL}/books`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setDataSource(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCopyContent = useCallback(() => {
    try {
      const copiedBooks = [...books, ...dataSource];
      console.log('Books copied:', copiedBooks);
      // Aqui você pode adicionar lógica para manipular os livros copiados, se necessário
    } catch (error) {
      console.error('Error copying content:', error);
    }
  }, [books, dataSource]);

  return(
    <>
      <p>DataGridArray</p>
      <IconButton aria-label="contentcopy" onClick={handleCopyContent}>
          <ContentCopyIcon />
      </IconButton>
      <DataGrid dataSource={dataSource} showBorders={true} repaintChangesOnly={true}>

        <Paging enabled={false} />
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}
        >
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
export default CrudDataGrid;

/* import React, { useCallback, useState } from 'react';
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Form,
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';
import { Item } from 'devextreme-react/form';
import { traducao } from "../helpers/Traducao";
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
traducao()

const URL = 'http://localhost:8800'


const books: Book[] = [];


const CrudDataGrid = () => {
    
  return(
    <>
      <p>DataGridArray</p>
      <IconButton aria-label="contentcopy">
          <ContentCopyIcon />
      </IconButton>
      <DataGrid dataSource={dataSource} showBorders={true} repaintChangesOnly={true}>

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

 */