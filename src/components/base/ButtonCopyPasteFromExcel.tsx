import React from 'react';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

interface Book {
  title: string;
  desc: string;
  price: string;
  cover: string;
}

interface ButtonCopyPasteFromExcelProps {
  pasteHandler: (data: string) => void;
}

const ButtonCopyPasteFromExcel: React.FC<ButtonCopyPasteFromExcelProps> = ({ pasteHandler }) => {
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
    const books: Book[] = [];
    
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
  };

  return (
    <IconButton aria-label="contentcopy" onClick={pasteContent}>
      <ContentCopyIcon />
    </IconButton>
  );
};

export default ButtonCopyPasteFromExcel;
