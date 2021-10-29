// https://www.npmjs.com/package/number-to-words
var converter = require('number-to-words');

const AmountToWords = (props) => {
    return <span>
        {converter.toWords(parseInt(props.amount))} rupees only  
    </span>
}

export default AmountToWords