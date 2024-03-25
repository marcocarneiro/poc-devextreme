import React from 'react'
import DataGrid, { Column, Summary, GroupItem, Export } from 'devextreme-react/data-grid'
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { orders } from "./dadosJSON/orders"
import { traducao, currencyBRL } from "./helpers/Traducao"
traducao()

//Exportação em Excel
const onExporting = (e: DataGridTypes.ExportingEvent) => {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Main sheet');
  
    exportDataGrid({
      component: e.component,
      worksheet,
      autoFilterEnabled: true,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'DataGrid.xlsx');
      });
    });
  };


const DgGroupTotals = () => (
    <DataGrid
        dataSource={orders}
        keyExpr="ID"
        showBorders={true}
        height={700}
        onExporting={onExporting}
    >
        <Column dataField="OrderNumber" width={130} caption="Num. Pedido" />
        <Column dataField="OrderDate" dataType="date" caption="Data do Pedido" />
        <Column dataField="Employee" groupIndex={0} caption="Cliente" />
        <Column dataField="CustomerStoreCity" caption="Cidade" />
        <Column dataField="CustomerStoreState" caption="Loja" />
        <Column dataField="SaleAmount" width={160} alignment="right" format="currency" caption="Valor do Pedido" customizeText={currencyBRL} />
        <Column dataField="TotalAmount" width={160} alignment="right" format="currency" caption="Total Geral" customizeText={currencyBRL} />
        <Summary>            
            <GroupItem
                column="TotalAmount"
                summaryType="sum"
                valueFormat="currency"
                showInGroupFooter={false}
                displayFormat="total {0}"
            />
        </Summary>
        <Export enabled={true} allowExportSelectedData={true} />
    </DataGrid>
)

export default DgGroupTotals