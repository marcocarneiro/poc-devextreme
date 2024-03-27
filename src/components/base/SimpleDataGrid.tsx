import 'devextreme/data/odata/store';
import DataGrid, { Column, SearchPanel, ColumnChooser, DataGridTypes, ColumnFixing, Export } from 'devextreme-react/data-grid'
import { exportDataGrid } from 'devextreme/pdf_exporter'
import { jsPDF } from 'jspdf'
import { createStore } from 'devextreme-aspnet-data-nojquery'
import '../App.css'
import 'devextreme/dist/css/dx.light.css'

const url = 'https://jsonplaceholder.typicode.com/photos'

const dataSource = createStore({
  key: 'id',
  loadUrl: url
})

const exportFormats = ['pdf'];
const onExporting = ({ component }: DataGridTypes.ExportingEvent) => {
  const doc = new jsPDF();
  exportDataGrid({
    jsPDFDocument: doc,
    component,
    margin: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
    topLeft: { x: 5, y: 5 },
    columnWidths: [30, 30, 30, 30, 30, 30],
    onRowExporting: (e) => {
      const isHeader = e.rowCells[0].text === 'Picture';
      if (!isHeader) {
        e.rowHeight = 40;
      }
    },
    customDrawCell: (e) => {
      if (e.gridCell.rowType === 'data' && e.gridCell.column.dataField === 'Picture') {
        doc.addImage(e.gridCell.value, 'PNG', e.rect.x, e.rect.y, e.rect.w, e.rect.h);
        e.cancel = true;
      }
    },
  }).then(() => {
    doc.save('DataGrid.pdf');
  })
}

//Renderiza coluna com link e imagem
const renderImageCell = (cellData: DataGridTypes.ColumnCellTemplateData) => (
  <div>
    <a href={cellData.value} target="_blank">
      <img src={cellData.value}></img>
    </a>
  </div>
)

//Renderiza coluna com link
const renderLinkCell = (cellData: DataGridTypes.ColumnCellTemplateData) => (
  <div>
    <a href={cellData.value} target="_blank">{cellData.value}</a>
  </div>
)

//Formatação para os cabeçalhos das colunas
const renderTitleHeader = (data) => {
  return <p><strong>{data.column.caption}</strong></p>
}

const SimpleDataGrid = () => (
  <DataGrid
    dataSource={dataSource}
    keyExpr="id"
    allowColumnReordering={true}
    allowColumnResizing={true}
    columnAutoWidth={true}
    showBorders={true}
    rowAlternationEnabled={true}
    onExporting={onExporting}
  >
    <Export enabled={true} formats={exportFormats} />
    <ColumnChooser enabled={true} />
    <ColumnFixing enabled={true} />

    <SearchPanel visible={true} />

    <Column dataField="albumId" caption="Álbum ID" headerCellRender={renderTitleHeader} />
    <Column dataField="id" caption="ID"  headerCellRender={renderTitleHeader} visible={false} />
    <Column dataField="title" caption="TÍTULO" headerCellRender={renderTitleHeader} />
    <Column dataField="url" cellRender={renderLinkCell} caption="URL" headerCellRender={renderTitleHeader} />
    <Column dataField="thumbnailUrl" cellRender={renderImageCell} caption="Miniatura" headerCellRender={renderTitleHeader} />
  </DataGrid>
);

export default SimpleDataGrid