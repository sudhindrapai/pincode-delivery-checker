import * as localStorageActionTypes from './LocalStorageActions';

const setInvoiceDetails = (value) => {
    if (typeof Storage !== "undefined"){
        localStorage.setItem("INVOICE_DETAILS",value)
    }
};

export const setLocalStorage = (type, value) => {
    switch (type) {
        case localStorageActionTypes.SET_INVOICE_DETAILS:
            setInvoiceDetails(value);
            break;
        default:
            break;
    }
};
