import { connect } from 'react-redux';
import { Redirect } from 'react-router';


let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
})



export const withAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {
        if (!props.isAuth) return <Redirect to={'/Login'} />
        return <Component {...props} />
    }

    let ConnectedRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectedRedirectComponent;

}

