import classes from './Button.module.css';

const Button = (props) => {
    return <button className={[classes.Btn, classes[props.BtnSize], classes[props.BtnClassName]].join(" ")} 
    onClick={props.clicked}>
        {props.children}
        </button>
}

export default Button