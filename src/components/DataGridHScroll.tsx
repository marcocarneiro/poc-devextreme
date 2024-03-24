import DataGrid, { Scrolling, Paging } from 'devextreme-react/data-grid';
import 'devextreme-react/text-area'
import { traducao } from './helpers/Traducao'
import { generateData } from './dadosJSON/muitasColunasData'

traducao()

const dataSource = generateData(50, 500);

const DataGridHScroll = () => {
  return(
    <DataGrid
        height={440}
        dataSource={dataSource}
        keyExpr="field1"
        showBorders={true}
        columnWidth={100}
    >
        <Scrolling columnRenderingMode="virtual" />
    </DataGrid>        
  )  
}

export default DataGridHScroll