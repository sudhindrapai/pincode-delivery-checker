import React, { Component, Fragment } from "react";
import {withRouter} from 'react-router-dom'
import components from "../../Components/ComponentIndex/ComponentIndex";
import classes from './Wrapper.module.css';


const AdminWrapper = (IncomingComponent) => {
    let SideBar = components["LeftNavigation"];

    class NewComponent extends Component{

        // add route name in the below array to avoid header nav and side bar
        restrictedRoutes = ["/invoice/view","/login"];

        render() {
            // if condition to check current route present in the restrected route and returns respective view
            if (!this.restrictedRoutes.includes(this.props.location.pathname)) {
                return <Fragment>
                <div className={classes.Container} >
                <div className={classes.Navigation}>
                     <SideBar/>
               </div>
                    <div className={classes.BodyContents}>
                    <div className={classes.TopMenu}>TopMenu</div>
                    <div className={classes.BodySection}>
                    <IncomingComponent />
                    </div>
                </div>
                </div>
               </Fragment>
            } else {
                return <div className={classes.BodySection}>
                <IncomingComponent />
                </div>
            }
        }
    }
        
    
    return withRouter(NewComponent)
        
};

export default AdminWrapper