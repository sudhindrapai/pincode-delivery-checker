const spacePattern = /^[ \f\n\r\t\v]*$/;
export const nameValidation = (value) => {
    let updatedValue = "",
    pattent = /^[a-zA-Z.-_ ]*$/;
    if (value !== undefined && value !== null && value.length > 0) {
        let inputLength = value.length;
        for (let i = 0; i<= inputLength; i++){
            let character = value.charAt(i);
            
            if (!spacePattern.test(character)){
                if (pattent.test(character) && !securityValidation(character)) {
                    updatedValue += character;
                }
            } else {
                updatedValue += character;
            }
        }
    } 
    return updatedValue
}

// function  to validate address
export const addressValidation = (value) => {
        let updatedValue = "",
        pattent = /^[a-zA-Z0-9.#/@&$"'-_ ]*$/;
        if (value !== undefined && value !== null && value.length > 0) {
            let inputLength = value.length;
            for (let i = 0; i<= inputLength; i++){
                let character = value.charAt(i);
                if (!spacePattern.test(character)){
                    if (pattent.test(character) && !securityValidation(character)) {
                        updatedValue += character;
                    }
                } else {
                    updatedValue += character;
                }
            }
        } 
        return updatedValue
}

export const validateEmail = (value) => {
    let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return pattern.test(value)
}

// security validations

const securityValidation = (character) => {
    const xssPreventPattern = /^[>< ]*$/;
    return xssPreventPattern.test(character);
};