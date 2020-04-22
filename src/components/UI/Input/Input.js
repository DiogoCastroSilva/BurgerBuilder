import React from 'react';
import classes from './Input.module.css';

const Input = ({elementType, elementConfig, value, label, changed, invalid, shouldValidate = false, touched, autocomplete="off"}) => {
    let inputElement = [null];
    const inputCLasses = [classes.InputElement];
    let validationError = null;

    if (invalid && shouldValidate && touched) {
        inputCLasses.push(classes.Invalid);
        validationError = <p className={classes.ValidationError}>Please enter a valid value!</p>;
    }

    switch (elementType) {
        case ('input'):
            inputElement = <input
                                className={inputCLasses.join(' ')}
                                value={value}
                                {...elementConfig}
                                onChange={changed}
                                autoComplete={autocomplete} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                                className={inputCLasses.join(' ')}
                                {...elementConfig}
                                onChange={changed} />
            break;
        case ('select'):
            inputElement = <select
                                className={inputCLasses.join(' ')}
                                value={value}
                                onChange={changed}>
                                    {elementConfig.options.map(option => (
                                        <option 
                                            value={option.value}
                                            key={option.value}>
                                                {option.display}
                                        </option>
                                    ))}
                            </select>
            break;
        default:
            inputElement = <input 
                                className={inputCLasses.join(' ')}
                                value={value}
                                {...elementConfig}
                                onChange={changed}
                                autoComplete={autocomplete}  />
    }

    const labelElemtn = label ? <label className={inputCLasses.join(' ')}>{label}</label> : null;
    return (
        <div className={classes.Input}>
            {labelElemtn}
            {inputElement}
            {validationError}
        </div>
    );
};

export default Input;