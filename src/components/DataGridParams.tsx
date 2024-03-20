import 'devextreme/data/odata/store';
import { DataGrid } from 'devextreme-react/data-grid';
import { createStore } from 'devextreme-aspnet-data-nojquery';
import '../App.css'
import 'devextreme/dist/css/dx.light.css'
import styled from '@emotion/styled'

const Estilo = styled.div`
.dx-datagrid-headers {
  color: #fff;
  background-color: #f70 !important;
}
`
interface Props {
  chave: string;
  url: string;
}

function DataGridParams({ chave, url }: Props) {
  const dataSource = createStore({
    key: chave,
    loadUrl: url
  });
  return (
    <Estilo>
      <DataGrid
        dataSource={dataSource}
        showBorders={true}
        rowAlternationEnabled={true}
      />
    </Estilo>    
  )
}

export default DataGridParams