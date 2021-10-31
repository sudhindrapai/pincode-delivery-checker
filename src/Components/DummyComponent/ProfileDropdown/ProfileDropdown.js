import classes from './ProfileDropdown.module.css';
import {authLogout} from '../../../firebasebase';

import {useHistory} from 'react-router-dom';

import Icons from '../../../ProjectIcons'

const ProfileDropdown = () => {

    const history = useHistory();

    const logout = () => {
        authLogout();
        history.replace("/login");
    };

    return <div className = {classes.DropdownContainer}>
        <div className={classes.ProfileImg}>
            {Icons["FcBusinessman"]}
        </div>
        <div className={classes.dropdownOptions}>
            <div className={classes.Option}>
                Change mode
            </div>
            <div className={classes.Divider} />
            <div className={classes.Option} onClick={logout} >
                Logout
            </div>
        </div>
    </div>
};

export default ProfileDropdown