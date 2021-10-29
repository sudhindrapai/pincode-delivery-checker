import classes from './CreateInvoice.module.css';
import {useReducer} from 'react'
import {useHistory} from 'react-router-dom';
import {nameValidation, addressValidation, validateEmail} from '../../Utilities/Utilities';
import Components from '../../Components/ComponentIndex/ComponentIndex';
import Icons from '../../ProjectIcons';
import * as localstorageActions from '../../LocalStorage/LocalStorageActions';
import {setLocalStorage} from '../../LocalStorage/SetLocalStorage';


import { push } from "firebase/database";
import {createInvoiceDbRef} from '../../firebasebase';

const invoiceState = {
    customerName:"",
    address:"",
    email:"",
    emailError:"",
    statusCode: 1,
    mobileNo:"",
    totalAmount:0,
    selectedPayment:"CASH",
    modeOfPayment:[
        {
            paymentType:"CASH",
            isSelected: true
        },
        {
            paymentType:"ONLINE",
            isSelected: false
        }
    ],
    deviceName:"",
    deviceError:"",
    billLineItems:[
        {
            serviceName:"",
            qty:1,
            rate:100,
            per:1,
            amount:0,
            isDeleted: false,
            key:0
        }
    ]
}

const setInvoiceState = (state = invoiceState, action) => {
    switch(action.type){
        case 'SET_CUSTOMER_NAME':
            return{
                ...state,
                customerName:action.value
            }
            case 'UPDATE_LINE_ITEMS_ARRAY':
                return{
                    ...state,
                    billLineItems: action.value,
                    totalAmount: action.sum
                }
            case 'SET_CUSTOMER_ADDRESS':
                return{
                        ...state,
                        address: action.value
                    }
            case 'SET_EMAIL_ID':
                        return {
                            ...state,
                            email: action.value,
                            emailError: action.errorMessage,
                            statusCode: action.statusCode
                        }
                case 'SET_MOBILE_NO':
                    return{
                                ...state,
                                mobileNo: action.value
                            }
                case 'SET_PAYMENT_METHOD':
                                return{
                                    ...state,
                                    selectedPayment: action.value
                                }
                                case 'SET_DEVICE_NAME':
                                    return{
                                        ...state,
                                        deviceName:action.value,
    deviceError:action.value.length === 0 ? "device name should not be empty": "",
                                    }

    }
}

const CreateInvoce = () => {
    const history = useHistory();
    const [formValue, setFormValue] = useReducer(setInvoiceState, invoiceState)

    const Button = Components["Button"];


    // function to set form reducers

    const setCustomerName = (event) => {
        setFormValue({
            type:"SET_CUSTOMER_NAME",
            value: nameValidation(event.target.value)
        })
    }

    const setLineItemArry = (updatedArray) => {
        setFormValue({
            type: 'UPDATE_LINE_ITEMS_ARRAY',
            value: updatedArray,
            sum: calculateSum(updatedArray)
        });
    }

    const setAddress = (event) => {
        setFormValue({
            type: 'SET_CUSTOMER_ADDRESS',
            value: addressValidation(event.target.value)
        });
    }

    const setMobileNo = (event) => {
        setFormValue({
            type: 'SET_MOBILE_NO',
            value: event.target.value
        })
    }

    const setEmailAddress = (event) => {
        //   status 1 -> no error, 2-> warning 3-> error
        let errorMessage = "";
        let statusCode = 1;

        let enteredEmailId = event.target.value;

        if (enteredEmailId !== null && enteredEmailId.length !== 0) {
            errorMessage = validateEmail(event.target.value) ? "" : "Invalid Email address";
            statusCode = 2;
        } else {
            errorMessage = "Email address is empty";
            statusCode = 3;
        }    

            setFormValue({
                type: 'SET_EMAIL_ID',
                value: event.target.value,
                errorMessage:errorMessage,
                statusCode:statusCode
            })
    }

    const setPaymentMode = (event) => {
        setFormValue({
            type:'SET_PAYMENT_METHOD',
            value: event.target.value
        })
    };

    const setDeviceName = (event) => {
        setFormValue({
            type:'SET_DEVICE_NAME',
            value: event.target.value
        })
    }

    // end function to set form reducers

    // function to create new lineitem
    const createNewServiceLineItem = () => { 
        let updatedArray = formValue.billLineItems;
        let emptyObj =  {
                    serviceName:"",
                    qty:1,
                    rate:100,
                    per:1,
                    amount:0,
                    isDeleted: false,
                    key: formValue.billLineItems.length
                };
                  updatedArray.push(emptyObj);
        
                  setLineItemArry(updatedArray);
    }

    // function to update input value in the lineitem
    const updateLineItemValue = (event, key, type) => {
        let lineItemsList = formValue.billLineItems.filter((lineItem) => {
            return lineItem.key === key
        });

        if (lineItemsList !== undefined && lineItemsList.length > 0) {
            lineItemsList = lineItemsList[0];
        };

        if (type === "SERVICE") {
            lineItemsList.serviceName = event.target.value;
        } else if (type === "AMOUNT") {
            lineItemsList.amount = event.target.value
        }

        let filteredArry = formValue.billLineItems.filter((lineItem) => {
            return lineItem.key !== key;
        });

        filteredArry.splice(key,0,lineItemsList);
        setLineItemArry(filteredArry);
    };

    // function to delete lineitem
    const toggleActiveState = (key) => {
        let selectedObj = formValue.billLineItems[key];
        selectedObj["isDeleted"] = !(selectedObj.isDeleted);

        let updatedValue = formValue.billLineItems;
        updatedValue.splice(key,1,selectedObj);
        setLineItemArry(updatedValue);
    }

    // function to create line iteam total sum
    const calculateSum = () => {
        let sum = 0;
        if (formValue.billLineItems.length > 0) {
            formValue.billLineItems.forEach(element => {
                if (!element.isDeleted)
                return addSum(element.amount)
            });
        }

        function addSum(count) {
            if (count !== NaN) {
                sum += parseInt(Math.ceil(count));
            }
        }
        return sum
    }

    //  function to create lineitem view
    let lineItemsView = formValue.billLineItems.map((lineItem, index) => {

        return <tr key={`lineItem_${index}`}>
            <td>
            <input value={lineItem.serviceName} onChange={(event) => {
                updateLineItemValue(event, lineItem.key, "SERVICE")
            }} />
            </td>
            <td>
                <div>
            <input type={"number"} value={lineItem.amount} onChange={(event) => {
                updateLineItemValue(event, lineItem.key, "AMOUNT")
            }} />
            <div onClick={() => {
                toggleActiveState(lineItem.key)
            }}>{lineItem.isDeleted ? Icons["FiRotateCcw"]:Icons["FiTrash2"]}</div>
            </div>
            </td>
            </tr>
        
    });

    // function to store bill details locally and redirectos to view part
    const createInvoice = () => {

        let customerName = formValue.customerName,
        address = formValue.address,
        email = formValue.email,
        mobile= formValue.mobileNo,
        totalAmount =  formValue.totalAmount,
        selectedPayment = formValue.selectedPayment,
        deviceName = formValue.deviceName,
        billLineItems = formValue.billLineItems;

        let invoiceObj = {}
        invoiceObj["customerName"] = customerName;
        invoiceObj["address"] = address;
        invoiceObj["email"] = email;
        invoiceObj["mobile"] = mobile;
        invoiceObj["totalAmount"] = totalAmount;
        invoiceObj["selectedPayment"] = selectedPayment;
        invoiceObj["deviceName"] = deviceName;
        invoiceObj["billLineItems"] = billLineItems;

        setLocalStorage(localstorageActions.SET_INVOICE_DETAILS, JSON.stringify(invoiceObj));

        // below push condition is to create invoice obj
        push(createInvoiceDbRef, invoiceObj);
        history.push("/invoice/list")
    }


    return <div className={classes.Container}>
        <div className={classes.FormContainer}>
            <div className={classes.FormGroup}>
                <label htmlFor={"customerName"}>
                    Customer Name
                </label>
                <input type={"text"} id={"customerName"} 
                value={formValue.customerName}
                onChange={(event) => {
                    setCustomerName(event);
                }} className={classes.BillInput} />
            </div>
            <div className={classes.TwoInputs}>
            <div className={classes.FormGroup}>
                <label htmlFor={"customerName"}>
                    Email id
                </label>
                <input type={"text"} id={"customerName"} 
                value={formValue.email}
                onChange={(event) => {
                    setEmailAddress(event);
                }} className={classes.BillInput} />
                <span className={[classes.Error, formValue.statusCode === 2 ? classes.ColRed : formValue.statusCode === 3 ? classes.Warning : classes.Success].join(" ")} >
                    {formValue.emailError}
                    </span>
            </div>
            <div className={classes.FormGroup}>
                <label htmlFor={"customerName"}>
                    Mobile number
                </label>
                <input type={"tel"} id={"customerName"} 
                value={formValue.mobileNo}
                onChange={(event) => {
                    setMobileNo(event);
                }} className={classes.BillInput} />
            </div>
            </div>
            <div className={classes.TwoInputs}>
            <div className={classes.FormGroup}>
                <label htmlFor={"customerName"}>
                    Payment Type
                </label>
                <select className={classes.BillInput} value={formValue.selectedPayment} onChange={(event) => {setPaymentMode(event)}}>
                {formValue.modeOfPayment.map((paymentMethod) => {
                    return <option value={paymentMethod.paymentType} >{paymentMethod.paymentType}</option>
                })}
                </select>
            </div>
            <div className={classes.FormGroup}>
                <label htmlFor={"customerName"}>
                    Device
                </label>
                <input type={"text"} id={"customerName"} 
                value={formValue.deviceName}
                onChange={(event) => {
                    setDeviceName(event);
                }} className={classes.BillInput} />
                <span className={[classes.Error, classes.ColRed].join(" ")} >
                    {formValue.deviceError}
                    </span>
            </div>
            </div>
            <div className={classes.FormGroup}>
                <label>
                    Address
                </label>
                <textarea value={formValue.address} onChange={(event) => {
                    setAddress(event)
                }}></textarea>
            </div>
            <div className={classes.FormGroup}>
                <div>
                    <Button BtnSize={"BtnMd"} BtnClassName={"BtnPrimary"} clicked={createNewServiceLineItem}>
                        Add Service Line Item
                    </Button>
                </div>
                <table className={classes.ServiceLineItmes}>
                    <thead>
                        <tr>
                            <th>
                                Service 
                            </th>
                            <th>
                                Amount
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {lineItemsView}
                    </tbody>
                </table>
            </div>
            <div className={classes.TotalAmount}>
                total: {formValue.totalAmount}
            </div>
            <Button BtnSize={"BtnMd"} BtnClassName={"BtnPrimary"} clicked={createInvoice}>
                        Create Invoice
                    </Button>
            </div>
    </div>
};

export default CreateInvoce