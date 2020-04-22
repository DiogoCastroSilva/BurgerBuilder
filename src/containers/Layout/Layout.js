import React, { Fragment, useState } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = ({isAuthenticated, children}) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);

    const sideDrawerCloseHandler = () => {
        setShowSideDrawer(false);
    };

    const sideDrawerToogleHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    return (
        <Fragment>
            <Toolbar
                isAuth={isAuthenticated}
                toogle={sideDrawerToogleHandler} />
            <SideDrawer
                isAuth={isAuthenticated}
                open={showSideDrawer}
                close={sideDrawerCloseHandler} />
            <main className={classes.Content}>
                {children}
            </main>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
