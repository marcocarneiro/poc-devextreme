import 'devextreme/data/odata/store';
import DataGrid, { Column, SearchPanel, ColumnChooser, DataGridTypes, ColumnFixing, Export } from 'devextreme-react/data-grid'
import { exportDataGrid } from 'devextreme/pdf_exporter'
import { jsPDF } from 'jspdf'
import { createStore } from 'devextreme-aspnet-data-nojquery'
import '../App.css'
import 'devextreme/dist/css/dx.light.css'
import styled from '@emotion/styled'

//Pacotes de tradução
import ptMessages from "devextreme/localization/messages/pt.json"
import { locale, loadMessages } from "devextreme/localization"
loadMessages(ptMessages);
locale(navigator.language);

const Estilo = styled.div`
.dx-datagrid-headers {
  color: #fff;
  background-color: #f70 !important;
}
`

const url = 'https://jsonplaceholder.typicode.com/photos'

const dataSource = createStore({
  key: 'id',
  loadUrl: url
})

const exportFormats = ['pdf'];
const onExporting = (e: DataGridTypes.ExportingEvent) => {
  const doc = new jsPDF();

  exportDataGrid({
    jsPDFDocument: doc,
    component: e.component,
    indent: 5,
  }).then(() => {
    doc.save('test.pdf');
  });
};

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
const renderTitleHeader = (data: any): JSX.Element => {
    return <p style={{ fontSize: '16px' }}>{data.column.caption}</p>;
}

const FullDataGrid = () => (
  <Estilo>
    <DataGrid
        dataSource={dataSource}
        keyExpr="id"
        allowColumnReordering={true}
        allowColumnResizing={true}
        columnAutoWidth={true}
        showBorders={true}
        rowAlternationEnabled={true}
        onExporting={onExporting}
        height={700}
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
  </Estilo>
);

export default FullDataGrid