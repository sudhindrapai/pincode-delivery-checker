import {useEffect, useState} from 'react';
import classes from './Invoice.module.css';

import components from '../../Components/ComponentIndex/ComponentIndex';

import {getCurrentDate} from '../../Utilities/Utilities';

import * as localstorageAction from '../../LocalStorage/LocalStorageActions';
import {getLocalStorage} from '../../LocalStorage/GetLocalStorage';

import {useHistory} from 'react-router-dom';

import IconsObj from '../../ProjectIcons';

const InvoiceTemplate = () => {

    const history = useHistory();

    let PrintIcon = IconsObj["FiPrinter"];

    const [invoiceObj, setInvoice] = useState({});
    let Button = components["Button"];


    useEffect(() => {
        let invoiceDetailObj = JSON.parse(getLocalStorage(localstorageAction.GET_INVOICE_DETAILS));
        setInvoice(invoiceDetailObj)
    },[]);

    const convertToPdf = () => {
        window.print()
    }

    const cancelPrint = () => {
        history.goBack();
    }

    let emailId = "",
    name = "",
    address = "",
    totalAmount = 0,
    selectedPayment = "",
    mobile = "",
    device = "",
    billLineItems = [];

    let lineItems = null;

    if (invoiceObj !== undefined && Object.keys(invoiceObj).length > 0) {

        emailId = invoiceObj.email;
        name = invoiceObj.customerName;
        address = invoiceObj.address;
        totalAmount = invoiceObj.totalAmount;
        selectedPayment = invoiceObj.selectedPayment;
        billLineItems = invoiceObj.billLineItems;
        device = invoiceObj.deviceName;
        mobile = invoiceObj.mobile;

        lineItems = billLineItems.map((lineItem, index) =>{
            return<tr>
                <td>
                    {index + 1}
                </td>
                <td>
                    {lineItem.serviceName}
                </td>
                <td>
                    {lineItem.qty}
                </td>
                <td>
                    {lineItem.amount}
                </td>
                <td>
                    {lineItem.per}
                </td>
                <td>
                    {lineItem.amount * lineItem.qty}
                </td>
            </tr>
        })
    }

    let AmountToWords = components["AmountToWords"];

    let invoiceUi = <div className={classes.Container}>
    <div className={classes.InvoiceContainer}>
    <div className={classes.HeaderSection}>
        <div className={classes.Logo}>
            <img src="https://dummyimage.com/200x120/000/fff" alt="invoce company name" />
        </div>
    </div>
    <div className={classes.AddressSection}>
        <div className={classes.Address}>
            <div className={classes.AddressTitle}>
                Store Address
            </div>
            <div className={classes.AddressDetaisl}>
            Behind Kamath Motors Hangaluru Kundapura
            <br />
            Phone: +91-7975346362/8762532476
            </div>
        </div>
        <div className={classes.Address}>
        <div className={classes.AddressTitle}>
                Customer Address
            </div>
            <div className={classes.AddressDetaisl}>
            {address}
            <br />
            Phone: +91-{mobile}
            <br />
            </div>
        </div>
    </div>
    <div className={classes.InvoiceDetails}>
        <div className={classes.Details}>
        <div className={classes.Detail}>
            <div className={classes.Label}>
                Email
            </div>
            <div className={classes.Value}>
                {emailId}
            </div>
            </div>
            <div className={classes.Detail}>
            <div className={classes.Label}>
                Date
            </div>
            <div className={classes.Value}>
                {getCurrentDate()}
            </div>
            </div>
            <div className={classes.Detail}>
            <div className={classes.Label}>
                Invoice No.
            </div>
            <div className={classes.Value}>
                123456789
            </div>
            </div>
        </div>
        <div className={classes.Details}>
        <div className={classes.Detail}>
            <div className={classes.Label}>
                Customer Name
            </div>
            <div className={classes.Value}>
                {name}
            </div>
            </div>
            <div className={classes.Detail}>
            <div className={classes.Label}>
                Mode of Payment
            </div>
            <div className={classes.Value}>
               {selectedPayment}
            </div>
            </div>
            <div className={classes.Detail}>
            <div className={classes.Label}>
                Serviced Device
            </div>
            <div className={classes.Value}>
                {device}
            </div>
            </div>
        </div>
    </div>
    <div className={classes.BodySection}>
        <table className={classes.InvoiceTable}>
            <thead>
                <tr>
                    <td>Sl. No.</td>
                    <td>Description</td>
                    <td>Qty</td>
                    <td>Rate</td>
                    <td>Per</td>
                    <td>Amount</td>
                </tr>
            </thead>
            <tbody>
                {lineItems}
            </tbody>
        </table>
        <div className={classes.TotalAmount}>
            Total: {parseFloat(totalAmount).toFixed(2)}
        </div>
        <div className={classes.AmountInWords}>
            Amount In Words: <AmountToWords amount={parseInt(totalAmount)} />
        </div>
    </div>
    <div className={classes.FooterSection}>
        <div className={classes.TearmsTitle}>
            Tearms And Conditions: 
        </div>
        <ol>
           <li>
           This warranty covers only the service provided / spare(s) replaced.
            </li> 
            <li>
            This warranty is good only to the person named as the owner of the product in the warranty and is no and/or transferable.
            </li>
            <li>
            The warranty will stand cancelled in case of any accidental/physical damage and/or water damage
            </li>
            <li>
            Warranty will be considered void if the device is serviced/tampered with by any party other than service center
            </li>
        </ol>
    </div>
    <div className={classes.Statement}>
            This is computer generated no need of signature
        </div>
    </div>
</div>

    return <>
    {invoiceUi}
    <div className={classes.PrintDiv}>
    <Button BtnSize={"BtnMd"} BtnClassName={"BtnPrimary"} clicked={cancelPrint} >
        Cancel
    </Button>
    <Button BtnSize={"BtnMd"} BtnClassName={"BtnPrimary"} clicked={convertToPdf} >
        {PrintIcon}  Print
    </Button>
    </div>
    </>
};

export default InvoiceTemplate