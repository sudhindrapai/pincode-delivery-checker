import {useMemo, memo} from 'react'
import classes from './Navigation.module.css';
import { NavLink} from 'react-router-dom'

import iconsObj from "../../../ProjectIcons";

import menuResponse from '../../../Asset/leftMenu.json';


const Navigation = () => {
    let responseArray = menuResponse.options;
    
    let menuOptions = null;

    useMemo(() => {
        menuOptions = responseArray.map((menuOption, index) => {
            return <div key={`menuItem_${index}`} className={classes.MenuItem}>
                {iconsObj[menuOption.iconName]}
                <NavLink to={menuOption.redirectionLink} activeClassName={classes.SelectedNav}>
                {menuOption.name}
                </NavLink>
            </div>
        });
    },[responseArray.length > 0])

    return <nav className={classes.NavSection}>
        <img src="https://dummyimage.com/200x120/000/fff" />
        {menuOptions}
        </nav>
}

export default memo(Navigation)