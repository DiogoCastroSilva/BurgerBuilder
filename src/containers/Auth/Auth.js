import React, { useState, useEffect } from 'react';
import classes from './Auth.module.css';

import { updateObject, checkValidation } from '../../shared/utility';

import Button  from '../../components/UI/Button/Button';
import Input from '../../components//UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';

import { auth } from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { setRedirectPath } from '../../store/actions/auth';

const Auth = ({
    building,
    loading,
    error,
    isAuth,
    redirectPath,
    onSetRedirectPath,
    onAuth
}) => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isSignup, setSignup] = useState(true);

    useEffect(() => {
        if (!building && redirectPath !== '/') {
            onSetRedirectPath();
        }
    }, [building, redirectPath, onSetRedirectPath]);


    const inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidation(event.target.value, controls[controlName].validation),
                touched: true
            })
        });

        setControls(updatedControls);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        onAuth(controls.email.value, controls.password.value, isSignup);
    };

    const switchAuthModeHandler = () => {
        setSignup(!isSignup);
    };

    const formElements = [];
    for (let key in controls) {
        formElements.push({
            id: key,
            config: controls[key]
        });
    }

    const form = loading ? <Spinner /> : formElements.map(formElement => (
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            changed={(event) => inputChangeHandler(event, formElement.id)}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            autocomplete='on' />
    ));

    const errorMessage = error ? <p>{error.message}</p>: null;

    const authRedirect = isAuth ? <Redirect to={redirectPath} /> : null;

    return(
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
                {form}
                <Button>SUBMIT</Button>
            </form>
            <Button
                clicked={switchAuthModeHandler}
                type='Danger'>SWITCH TO {isSignup ? 'SIGN UP' : 'SIGN IN'}</Button>
        </div>
    );
}

const matStateToProps = state => {
    return {
        loading: state.auth.isLoading,
        error: state.auth.error,
        isAuth: state.auth.token !== null,
        building: state.burgerBuilder.building,
        redirectPath: state.auth.redirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),
        onSetRedirectPath: () => dispatch(setRedirectPath('/'))
    };
};

export default connect(matStateToProps, mapDispatchToProps)(Auth);