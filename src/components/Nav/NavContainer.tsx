import { connect } from 'react-redux';
import { NavInitialStateType } from '../../redux/nav-reducer';
import { AppStateType } from '../../redux/redux-store';
import Nav from './Nav';


type MapStateType = {
    navPage: NavInitialStateType
    isAuth: boolean
}

let mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        navPage: state.navPage,
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {

    }
}

const NavContainer = connect(mapStateToProps, mapDispatchToProps)(Nav);

export default NavContainer;


