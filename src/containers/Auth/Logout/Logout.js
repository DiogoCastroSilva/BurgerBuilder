import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../store/actions';
import { Redirect } from 'react-router-dom';

const Logout = ({ onLogout }) => {
    useEffect(() => {
        onLogout();
    }, [onLogout]);

    return <Redirect to='/' />;
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    };
};
export default connect(null, mapDispatchToProps)(Logout);