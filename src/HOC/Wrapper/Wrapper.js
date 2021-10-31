import React, { Component, Fragment } from "react";
import {withRouter} from 'react-router-dom'
import components from "../../Components/ComponentIndex/ComponentIndex";
import classes from './Wrapper.module.css';

import Icons from '../../ProjectIcons';


const AdminWrapper = (IncomingComponent) => {
    let SideBar = components["LeftNavigation"];
    let ProfileDropdown = components["ProfileDropdown"];
    let Backdrop = components["Backdrop"];

    let toggleIcon = Icons["FiMenu"];

    class NewComponent extends Component{

        state = {
            isMenuExpanded: window.innerWidth <= 425 ? false : true
        }

        updateState = () => {
            this.setState({
                ...this.state,
                isMenuExpanded: !(this.state.isMenuExpanded)
            });
        }

        // add route name in the below array to avoid header nav and side bar
        restrictedRoutes = ["/invoice/view","/login", "/"];
        

        render() {
            // if condition to check current route present in the restrected route and returns respective view
            if (!this.restrictedRoutes.includes(this.props.location.pathname)) {
                return <Fragment>
                <div className={classes.Container} >
                <div className={[classes.Navigation, this.state.isMenuExpanded? classes.Open : classes.Close].join(" ")}>
                    {console.log(this.state.isMenuExpanded,"this.state.isMenuExpanded")}
                     <SideBar/> <Backdrop isVisible={this.state.isMenuExpanded && window.innerWidth <= 425} clicked={this.updateState} />
               </div>
                    <div className={classes.BodyContents}>
                    <div className={classes.TopMenu}>
                        <span onClick={ this.updateState}>{window.innerWidth <= 425 && toggleIcon}</span>
                        <ProfileDropdown />
                    </div>
                    <div className={classes.BodySection}>
                    <IncomingComponent />
                    </div>
                </div>
                </div>
               </Fragment>
            } else {
                return <div className={classes.EmptyBodySection}>
                <IncomingComponent />
                </div>
            }
        }
    }
        
    
    return withRouter(NewComponent)
        
};

export default AdminWrapper