import styled from '@emotion/styled'

//Estilo para exibir ícones na coluna de edição
//deve-se fazer o download dos SVG
export const BlueDGIcons = styled.div`
.dx-link {
  text-indent: 50000px;  
  background-size: 24px 24px;
  height: 24px;
  width: 24px;
  margin-left: 16px;
  background-color: #07f;
}
.dx-link:hover {
  background-color: #aaa;
}
.dx-link-edit{  
  background-repeat: none;
  -webkit-mask-image: url('./edit_black_24dp.svg');
  mask-image: url('./edit_black_24dp.svg');  
}
.dx-link-delete{
  background-repeat: none;
  -webkit-mask-image: url('./delete_black_24dp.svg');
  mask-image: url('./delete_black_24dp.svg');
}
`