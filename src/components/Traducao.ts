import ptMessages from "devextreme/localization/messages/pt.json"
import { locale, loadMessages } from "devextreme/localization"

export const traducao = () =>{    
    loadMessages( ptMessages )
    locale( navigator.language )
    //Formato de moeda Brasileiro
    const currencyBRL = (cellInfo: { value: number }): string => {
        const numFormat = cellInfo.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
        return numFormat
    }
}