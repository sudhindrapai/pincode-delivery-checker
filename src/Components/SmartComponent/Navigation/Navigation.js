import { memo } from 'react'
import classes from './Navigation.module.css';
import { NavLink} from 'react-router-dom'

import iconsObj from "../../../ProjectIcons";

import menuResponse from '../../../Asset/leftMenu.json';


const Navigation = () => {
    let responseArray = menuResponse.options;
    
    // let menuOptions = useRef()
    let menuOptions = null;

    const addToHomeScreanPrompt = () => {
        let swPromptRef = window.deferredPrompt;
        console.log("A2HS clicked", swPromptRef);
        if (swPromptRef) {
            swPromptRef.prompt();
            swPromptRef.userChoice.then((choiceResult) => {
                console.log(choiceResult.outcome)
            })
        }
    };

    // useMemo(() => {
         menuOptions = responseArray.map((menuOption, index) => {
            return <div key={`menuItem_${index}`} className={classes.MenuItem}>
                {iconsObj[menuOption.iconName]}
                <NavLink to={menuOption.redirectionLink} activeClassName={classes.SelectedNav}>
                {menuOption.name}
                </NavLink>
            </div>
        });
    // },[responseArray.length > 0])

    return <nav className={classes.NavSection}>
        <img src="https://dummyimage.com/200x120/000/fff" alt="invoice company" />
        {menuOptions}
        <button onClick={addToHomeScreanPrompt}>Add to homescreen</button>
        </nav>
}

export default memo(Navigation)