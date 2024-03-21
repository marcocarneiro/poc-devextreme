import React, { useCallback, useState } from 'react'
import DataGrid, {
  Column,
  Editing,
  Popup,
  Paging,
  Lookup,
  Form,
} from 'devextreme-react/data-grid'
import 'devextreme-react/text-area'
import { Item } from 'devextreme-react/form'
import CustomStore from 'devextreme/data/custom_store'
import DataSource from 'devextreme/data/data_source'
import styled from '@emotion/styled'
import 'whatwg-fetch'

//Pacotes de tradução
import ptMessages from "devextreme/localization/messages/pt.json"
import { locale, loadMessages } from "devextreme/localization"
loadMessages(ptMessages)
locale(navigator.language)

//Estilo para exibir ícones na coluna de edição
const Estilo = styled.div`
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

const refreshModeLabel = { 'aria-label': 'Refresh Mode' }
const URL = 'https://65fb424614650eb21009be7c.mockapi.io/crudtest/v1/users'
//https://github.com/mockapi-io/docs/wiki/Code-examples
const REFRESH_MODES = ['full', 'reshape', 'repaint']

const CrudDataGridAPI = () => {
  //VER ESTE EXEMPLO:  https://js.devexpress.com/React/Demos/WidgetsGallery/Demo/DataGrid/WebAPIService/Light/


  /* const [ordersData] = useState(new CustomStore({
    key: 'OrderID',
    load: () => sendRequest(`${URL}/Orders`),
    insert: (values) => sendRequest(`${URL}/InsertOrder`, 'POST', {
      values: JSON.stringify(values),
    }),
    update: (key, values) => sendRequest(`${URL}/UpdateOrder`, 'PUT', {
      key,
      values: JSON.stringify(values),
    }),
    remove: (key) => sendRequest(`${URL}/DeleteOrder`, 'DELETE', {
      key,
    }),
  }));
  const [customersData] = useState(new CustomStore({
    key: 'Value',
    loadMode: 'raw',
    load: () => sendRequest(`${URL}/CustomersLookup`),
  }));
  const [shippersData] = useState(new CustomStore({
    key: 'Value',
    loadMode: 'raw',
    load: () => sendRequest(`${URL}/ShippersLookup`),
  }));

  const [requests, setRequests] = useState([]);
  const [refreshMode, setRefreshMode] = useState<DataGridTypes.GridsEditRefreshMode>('reshape');

  const handleRefreshModeChange = useCallback((e: SelectBoxTypes.ValueChangedEvent) => {
    setRefreshMode(e.value);
  }, []);

  const clearRequests = useCallback(() => {
    setRequests([]);
  }, []);

  const logRequest = useCallback((method, url: string, data: Record<string, any>) => {
    const args = Object.keys(data || {}).map((key) => `${key}=${data[key]}`).join(' ');

    const time = formatDate(new Date(), 'HH:mm:ss');
    const request = [time, method, url.slice(URL.length), args].join(' ');

    setRequests((prevRequests: ConcatArray<string>) => [request].concat(prevRequests));
  }, []);

  const sendRequest = useCallback(async (url: string, method = 'GET', data = {}) => {
    logRequest(method, url, data);

    const request: RequestInit = {
      method, credentials: 'include',
    };

    if (['DELETE', 'POST', 'PUT'].includes(method)) {
      const params = Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');

      request.body = params;
      request.headers = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
    }

    const response = await fetch(url, request);

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const result = isJson ? await response.json() : {};

    if (!response.ok) {
      throw result.Message;
    }

    return method === 'GET' ? result.data : {};
  }, [logRequest]); */

  return (
    <div id="data-grid-demo">
    <Estilo>
      <DataGrid
        dataSource={clientes}
        keyExpr="ID"
        showBorders={true}
      >
        <Paging enabled={false} />
        <Editing
          mode="popup"
          allowUpdating={true}
          allowAdding={true}
          allowDeleting={true}>
          <Popup title="Employee Info" showTitle={true} width={700} height={525} />
          <Form>
            <Item itemType="group" colCount={2} colSpan={2}>
              <Item dataField="FirstName" />
              <Item dataField="LastName" />
              <Item dataField="Prefix" />
              <Item dataField="BirthDate" />
              <Item dataField="Position" />
              <Item dataField="HireDate" />
              <Item
                dataField="Notes"
                editorType="dxTextArea"
                colSpan={2}
                editorOptions={notesEditorOptions} />
            </Item>

            <Item itemType="group" caption="Home Address" colCount={2} colSpan={2}>
              <Item dataField="StateID" />
              <Item dataField="Address" />
            </Item>
          </Form>
        </Editing>
        <Column dataField="Prefix" caption="Title" width={70} />
        <Column dataField="FirstName" />
        <Column dataField="LastName" />
        <Column dataField="BirthDate" dataType="date" />
        <Column dataField="Position" width={170} />
        <Column dataField="HireDate" dataType="date" />
        <Column dataField="StateID" caption="State" width={125}>
          <Lookup dataSource={states} valueExpr="ID" displayExpr="Name" />
        </Column>
        <Column dataField="Address" visible={false} />
        <Column dataField="Notes" visible={false} />
      </DataGrid>
    </Estilo>
  </div>
  );
};

export default CrudDataGridAPI