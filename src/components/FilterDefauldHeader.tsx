import React, { useCallback, useRef, useState } from 'react'
import DataGrid, { Column, FilterRow, HeaderFilter, Search, SearchPanel, } from 'devextreme-react/data-grid'
import SelectBox, { SelectBoxTypes } from 'devextreme-react/select-box'
import CheckBox, { CheckBoxTypes } from 'devextreme-react/check-box'

import { traducao } from './Traducao'

/* //Pacotes de tradução
import ptMessages from "devextreme/localization/messages/pt.json"
import { locale, loadMessages } from "devextreme/localization"
loadMessages( ptMessages )
locale( navigator.language )
//Formato de moeda Brasileiro
const currencyBRL = (cellInfo: { value: number }): string => {
    const numFormat = cellInfo.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    return numFormat
} */

import { pedidos } from './dadosJSON/pedidos'

//Comparar com esse código:  https://js.devexpress.com/React/Demos/WidgetsGallery/Demo/DataGrid/Filtering/MaterialBlueLight/
const FilterDefaultHeader = () => {
    return(
        <DataGrid dataSource={pedidos} keyExpr="ID" showBorders={true}>
            <SearchPanel visible={true} width={240} />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />

            <Column dataField="OrderNumber" caption="Pedido No" />
            <Column dataField="OrderDate" caption="Data Pedido" dataType="date" />
            <Column dataField="DeliveryDate" caption="Data Entrega" dataType="datetime" format="d/M/yyyy - HH:mm" />
            <Column dataField="SaleAmount" caption="Valor" dataType="number" format="currency" /* customizeText={currencyBRL} */ />
            <Column dataField="Employee" caption="Cliente" />
            <Column dataField="CustomerStoreCity" caption="Cidade Loja" />
        </DataGrid>
    )    
}

export default FilterDefaultHeader



