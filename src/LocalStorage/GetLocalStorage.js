import * as localStorageActionTypes from './LocalStorageActions';


const getInvoiceDetails = () => {
    if (typeof(Storage) !== "undefined"){
        return localStorage.getItem("INVOICE_DETAILS");
    }
};

export const getLocalStorage = (type) => {
    switch (type) {
        case localStorageActionTypes.GET_INVOICE_DETAILS:
            return getInvoiceDetails();
        default:
            break;
    }
};