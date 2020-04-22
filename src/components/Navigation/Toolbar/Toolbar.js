import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle';

const Toolbar = ({toogle, isAuth}) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToogle cliked={toogle} />
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav className={classes.DesktopOnly}>
                <NavigationItems isAuth={isAuth} />
            </nav>
        </header>
    );
};

export default Toolbar;