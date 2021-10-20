import { useEffect } from "react";
import classes from './Pincode.module.css';

import components from "../../Components/ComponentIndex/ComponentIndex";

const Pincode = () => {
    let Button = components["Button"]
    return <div>
        <Button BtnSize={"BtnMd"} BtnClassName = {"BtnPrimary"}>
            Import
        </Button>
        <Button BtnSize={"BtnMd"} BtnClassName = {"BtnBorder"}>
            Export
        </Button>
        Pincode</div>
}

export default Pincode;