import React from 'react';
import Header from './Header';
import { withAuthRedirect } from '../../Hoc/withAuthRedirect';
import { compose } from 'redux';



class HeaderContainer extends React.Component {
    render() {
        return (
            <Header {...this.props} />
        )
    }
}


export default compose(
    // withAuthRedirect
)(HeaderContainer)


