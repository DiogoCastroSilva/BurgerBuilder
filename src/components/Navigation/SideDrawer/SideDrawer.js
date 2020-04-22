import React, { Fragment } from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = ({close, open, isAuth}) => {
    const attachedClasses = [classes.SideDrawer];
    attachedClasses.push(open ? classes.Open : classes.Close);
    return (
        <Fragment>
            <Backdrop show={open} clicked={close}/>
            <div className={attachedClasses.join(' ')} onClick={close}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={isAuth} />
                </nav>
            </div>
        </Fragment>
    );
};

export default SideDrawer;