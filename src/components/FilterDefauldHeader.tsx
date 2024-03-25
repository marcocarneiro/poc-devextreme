import React, { useCallback, useRef, useState } from 'react'
import DataGrid, { Column, FilterRow, HeaderFilter, SearchPanel, } from 'devextreme-react/data-grid'

import {traducao, currencyBRLCell} from './helpers/Traducao'
traducao()

//FONTE DE DADOS
import { pedidos } from './dadosJSON/pedidos'

const FilterDefaultHeader = () => {
    return(
        <DataGrid dataSource={pedidos} keyExpr="ID" showBorders={true}>
            <SearchPanel visible={true} width={240} />
            <FilterRow visible={true} />
            <HeaderFilter visible={true} />

            <Column dataField="OrderNumber" caption="Pedido No" />
            <Column dataField="OrderDate" caption="Data Pedido" dataType="date" />
            <Column dataField="DeliveryDate" caption="Data Entrega" dataType="datetime" format="d/M/yyyy - HH:mm" />
            <Column dataField="SaleAmount" caption="Valor" dataType="number" format="currency" customizeText={currencyBRLCell} />
            <Column dataField="Employee" caption="Cliente" />
            <Column dataField="CustomerStoreCity" caption="Cidade Loja" />
        </DataGrid>
    )    
}

export default FilterDefaultHeader

