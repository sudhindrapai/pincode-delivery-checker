import classes from './Navigation.module.css';
import components from '../../ComponentIndex/ComponentIndex';

import menuResponse from '../../../Asset/leftMenu.json'


const Navigation = () => {
    let responseArray = menuResponse.options;
    
    console.log(menuResponse)
    return <div>Navigation options</div>
}

export default Navigation