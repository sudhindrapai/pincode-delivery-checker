import React, { Component, Fragment } from "react";
import components from "../../Components/ComponentIndex/ComponentIndex";
import classes from './Wrapper.module.css';

const AdminWrapper = (IncomingComponent) => {
    let SideBar = components["LeftNavigation"];

    class NewComponent extends Component{
        render() {
            return <Fragment>
                 <div className={classes.Container} >
                 <div className={classes.Navigation}>
                      <SideBar/>
                     </div>
                     <div className={classes.BodyContents}>
                     <div className={classes.TopMenu}>TopMenu</div>
                 <IncomingComponent />
                 </div>
                 </div>
                </Fragment>
        }
    }
    

    return NewComponent
        
};

export default AdminWrapper