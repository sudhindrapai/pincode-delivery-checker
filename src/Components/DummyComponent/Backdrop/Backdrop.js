import classes from './Backdrop.module.css';

const Backdrop = (props) => {
    return (
        <div className={[classes.Backdrop, props.isVisible ? classes.Show : classes.Hide]. join(" ")} onClick={props.clicked} />
    )
};

export default Backdrop