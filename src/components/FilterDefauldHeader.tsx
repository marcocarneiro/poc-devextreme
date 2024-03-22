import React, { useCallback, useRef, useState } from 'react'
import DataGrid, { Column, FilterRow, HeaderFilter, Search, SearchPanel, } from 'devextreme-react/data-grid'
import SelectBox, { SelectBoxTypes } from 'devextreme-react/select-box'
import CheckBox, { CheckBoxTypes } from 'devextreme-react/check-box'

//Pacotes de tradução
import ptMessages from "devextreme/localization/messages/pt.json"
import { locale, loadMessages } from "devextreme/localization"
loadMessages( ptMessages )
locale( navigator.language )

//FONTE DE DADOS
import { pedidos } from './dadosJSON/pedidos'

const brcurrency = (cellInfo: { value: number }): string => {
    return 'R$ ' + cellInfo.value
}

const FilterDefaultHeader = () => {
    return(
        <DataGrid
        id="gridContainer"
        dataSource={pedidos}
        keyExpr="ID"
        showBorders={true}>
            <Column 
            dataField="OrderNumber"
            caption="Pedido No"
            />
            <Column 
            dataField="OrderDate"
            caption="Data Pedido"
            dataType="date"
            />
            <Column 
            dataField="DeliveryDate"
            caption="Data Entrega"
            dataType="datetime"
            format="d/M/yyyy - HH:mm"
            />
            <Column 
            dataField="SaleAmount"
            caption="Valor"
            dataType="number"
            format="currency"
            customizeText={brcurrency}
            />
            <Column 
            dataField="Employee"
            caption="Cliente"
            />
            <Column 
            dataField="CustomerStoreCity"
            caption="Cidade Loja"
            />
        </DataGrid>
    )    
}

export default FilterDefaultHeader





/* const saleAmountEditorOptions = { format: 'currency', showClearButton: true };
const filterLabel = { 'aria-label': 'Filter' };

const applyFilterTypes = [{
  key: 'auto' as const,
  name: 'Immediately',
}, {
  key: 'onClick' as const,
  name: 'On Button Click',
}];

const saleAmountHeaderFilter = [{
  text: 'Less than $3000',
  value: ['SaleAmount', '<', 3000],
}, {
  text: '$3000 - $5000',
  value: [
    ['SaleAmount', '>=', 3000],
    ['SaleAmount', '<', 5000],
  ],
}, {
  text: '$5000 - $10000',
  value: [
    ['SaleAmount', '>=', 5000],
    ['SaleAmount', '<', 10000],
  ],
}, {
  text: '$10000 - $20000',
  value: [
    ['SaleAmount', '>=', 10000],
    ['SaleAmount', '<', 20000],
  ],
}, {
  text: 'Greater than $20000',
  value: ['SaleAmount', '>=', 20000],
}];

const getOrderDay = (rowData) => (new Date(rowData.OrderDate)).getDay();

function calculateFilterExpression(value: string, selectedFilterOperations, target: string) {
  const column = this;

  if (target === 'headerFilter' && value === 'weekends') {
    return [[getOrderDay, '=', 0], 'or', [getOrderDay, '=', 6]];
  }

  return column.defaultCalculateFilterExpression(value, selectedFilterOperations, target);
}

const orderHeaderFilter = (data) => {
  data.dataSource.postProcess = (results) => {
    results.push({
      text: 'Weekends',
      value: 'weekends',
    });

    return results;
  };
};

const FilterDefaultHeader = () => {
  const [showFilterRow, setShowFilterRow] = useState(true)
  const [showHeaderFilter, setShowHeaderFilter] = useState(true)
  //
  const [currentFilter, setCurrentFilter] = useState(applyFilterTypes[0].key)
  const dataGridRef = useRef(null)

  const clearFilter = useCallback(() => {
    dataGridRef.current.instance.clearFilter()
  }, [])

  const onShowFilterRowChanged = useCallback((e: CheckBoxTypes.ValueChangedEvent) => {
    setShowFilterRow(e.value);
    clearFilter()
  }, [clearFilter])

  const onShowHeaderFilterChanged = useCallback((e: CheckBoxTypes.ValueChangedEvent) => {
    setShowHeaderFilter(e.value)
    clearFilter()
  }, [clearFilter])
  

  return (
    <div>
      <DataGrid
        id="gridContainer"
        ref={dataGridRef}
        dataSource={pedidos}
        keyExpr="ID"
        showBorders={true}>
        <FilterRow
          visible={showFilterRow}
          applyFilter={currentFilter} />
        <HeaderFilter visible={showHeaderFilter} />
        <SearchPanel
          visible={true}
          width={240}
          placeholder="Search..." />
        <Column
          dataField="OrderNumber"
          width={140}
          caption="Invoice Number">
          <HeaderFilter groupInterval={10000} />
        </Column>
        <Column
          dataField="OrderDate"
          alignment="right"
          dataType="date"
          width={120}
          calculateFilterExpression={calculateFilterExpression}>
          <HeaderFilter dataSource={orderHeaderFilter} />
        </Column>
        <Column
          dataField="DeliveryDate"
          alignment="right"
          dataType="datetime"
          format="M/d/yyyy, HH:mm"
          width={180} />
        <Column
          dataField="SaleAmount"
          alignment="right"
          dataType="number"
          format="currency"
          editorOptions={saleAmountEditorOptions}>
          <HeaderFilter dataSource={saleAmountHeaderFilter} />
        </Column>
        <Column dataField="Employee" />
        <Column
          dataField="CustomerStoreCity"
          caption="City">
          <HeaderFilter>
            <Search enabled={true} />
          </HeaderFilter>
        </Column>
      </DataGrid>      
    </div>
  )
}

export default FilterDefaultHeader */