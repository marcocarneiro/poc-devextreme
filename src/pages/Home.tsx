import React from 'react'
import '../App.css'
import 'devextreme/dist/css/dx.light.css'
import DataGridParams from '../components/DataGridParams'
import CrudDataGridAPI from '../components/CrudDataGridAPI'
import TestCrud from '../components/TestCrud'
import EditDelDataGrid from '../components/EditDelDataGrid'

const Home = (): JSX.Element => {
    return (
        <>
            <CrudDataGridAPI />
        </>        
    )
}

export default Home