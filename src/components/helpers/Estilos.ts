import '../../App.css'
import 'devextreme/dist/css/dx.light.css'
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

export const HeaderOrange = styled.div`
.dx-datagrid-headers {
  color: #fff;
  background-color: #f70 !important;
}
`

export const CustomToolBar = styled.div`
  .custom-toolbar {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
  }
  .custom-toolbar button {
    background-color: #fff;
    border-color: #ddd;
    color: #333;
    padding: 8px 0;
    min-width: 40px;
  }
  .custom-toolbar button svg {    
    font-size: 18px;
  }
  .custom-toolbar button: hover {
    background-color: #f5f5f5;
  }
  
  .dx-toolbar-after{
    margin-right: 50px !important;
  }
`