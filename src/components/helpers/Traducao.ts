import ptMessages from "devextreme/localization/messages/pt.json"
import { locale, loadMessages } from "devextreme/localization"

export const traducao = ():void => {
    loadMessages( ptMessages )
    locale( navigator.language )
}

export const currencyBRLCell= (cellInfo: { value: number }): string => {
    const numFormat = cellInfo.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    return numFormat
}

export const currencyBRLTotal = (itemInfo) => {
    const numFormat = itemInfo.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
    return numFormat
}