/** Importação de componentes e recursos  **/
import React, { useState } from 'react';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

/** URL da API (importante: Substituir abordagem por VARIÁVEL DE AMBIENTE) */
const URL = 'http://localhost:8800';

/** Definição do objeto Book com os tipos de dados, geralmente usado no BD */
interface Book {
  title: string;
  desc: string;
  price: string;
  cover: string;
}

/** Interface para definição de PROPS como função
 *  Essa abordagem serve para atualizar o componente PAI
 *  avisando que novos dados foram inseridos
 */
interface ButtonCopyPasteFromExcelProps {
  onDataInserted: () => void; // Adicionando a função onDataInserted
}

/** Declaração do componente ButtonCopyPasteFromExcel */
const ButtonCopyPasteFromExcel: React.FC<ButtonCopyPasteFromExcelProps> = ({ onDataInserted }) => {
  const [insertSuccess, setInsertSuccess] = useState(false); // Estado local para indicar se a inserção foi bem-sucedida

  //Verifica se o navegador permite acesso ao clipboard
  const pasteContent = () => {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.readText()
      .then((conteudo) => {
        //se o clipboard tiver dados, ativa a função tratadados()
        trataDados(conteudo);
      })
      .catch((erro) => {
        console.log(erro);
      });
  };

  //função para tratar os dados copiados e deixar esses dados no formato
  //da interface Book - converte as strings copiadas em uma array
  const trataDados = (pastedData: string) => {
    const data: string = pastedData;
    const rows: string[] = data.split('\n');
    const books: Book[] = [];
    
    //percorre as linhas da array deixando-as no formato da interface Book
    for (const y in rows) {
      const cells: string[] = rows[y].split('\t');
      cells[cells.length - 1] = cells[cells.length - 1].replace(/\r$/, '');
  
      if (cells.length > 1) {
        books.push({ 'title': cells[0], 'desc': cells[1], 'price': cells[2], 'cover': cells[3] });
      }
    }
    //Após a formatação dos dados, a função atualizaBDArray é ativada passando
    //os dados formatados
    atualizaBDArray(books);   
  }
  
  //Função para INSERIR os dados formatados no BD
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
    setInsertSuccess(true); // Indicando que a inserção foi bem-sucedida
    onDataInserted(); // Chamando onDataInserted após inserção bem-sucedida (e forçando a atualização do componente PAI)
  };

  return (
    <Button aria-label="contentcopy" variant="outlined" color="info" onClick={pasteContent}>
      <ContentCopyIcon />
    </Button>
  );
};

export default ButtonCopyPasteFromExcel;
