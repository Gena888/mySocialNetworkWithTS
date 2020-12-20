import { connect } from 'react-redux';
import Nav from './Nav';




let mapStateToProps = (state) => {
    return {
        navPage: state.navPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) => {
    return {

    }
}

const NavContainer = connect(mapStateToProps, mapDispatchToProps) (Nav);

export default NavContainer;


