import {useEffect, useState} from 'react';
import classes from './InvoiceList.module.css';
import {onValue} from "firebase/database";
import {getInvoiceDbRef} from '../../firebasebase';
import components from '../../Components/ComponentIndex/ComponentIndex';
import { useHistory } from 'react-router';

import * as localStorageAction from '../../LocalStorage/LocalStorageActions';
import {setLocalStorage} from '../../LocalStorage/SetLocalStorage';

const InvoiceList = () => {

  const history = useHistory()

  let Button = components["Button"]
    const [invoiceList, setInvoiceList] = useState([]);
    const [rawResponse, setRawResponse] = useState({});

    useEffect(() => {
        onValue(getInvoiceDbRef, (snapshot) => {
          const data = snapshot.val();
          let updatedArray = [];
          for (let key in data) {
            let invoiceObj = data[key];
            invoiceObj["firebaseKey"] = key;
            updatedArray.push(invoiceObj)
          }
          // let valuesArray = Object.values(data);
          setInvoiceList(updatedArray);
          setRawResponse(data)
        });
    },[]);

    const redirectToShowInvoice = (firebaseKey) => {
      console.log(rawResponse[firebaseKey]);
      setLocalStorage(localStorageAction.SET_INVOICE_DETAILS, JSON.stringify(rawResponse[firebaseKey]))
      history.push("/invoice/view")
    };

    let invoiceListView = null;

    if (invoiceList !== undefined && invoiceList !== null && invoiceList.length > 0) {
      invoiceListView = invoiceList.map((invoiceObj) => {
        return <tr>
          <td>
            {invoiceObj.customerName}
          </td>
          <td>
            {invoiceObj.email}
          </td>
          <td>
            {invoiceObj.mobile}
          </td>
          <td>
            08-02-1994
          </td>
          <td>
            {invoiceObj.selectedPayment}
          </td>
          <td>
            {invoiceObj.deviceName}
          </td>
          <td>
            {invoiceObj.totalAmount}
          </td>
          <td>
            <Button BtnSize={"BtnMd"} BtnClassName={"BtnPrimary"} 
            clicked={() => {redirectToShowInvoice(invoiceObj.firebaseKey)}}>
              View Invoice
            </Button>
          </td>
        </tr>
      })
    }

    return <div className={classes.Container}>
      <div className={classes.ViewContainer}>
      <div className={classes.TableContainer}>
        <table>
          <thead>
            <tr>
              <td>
                Name
              </td>
              <td>
                Email Id
              </td>
              <td>
                Mobile No.
              </td>
              <td>
                Date
                </td>
              <td>
                Payment Type
              </td>
              <td>
                Device
              </td>
              <td>
                Amount
              </td>
              <td>
                Action
              </td>
            </tr>
          </thead>
          <tbody>
            {invoiceListView}
          </tbody>
        </table>
      </div>
      </div>
      
    </div>
};

export default InvoiceList