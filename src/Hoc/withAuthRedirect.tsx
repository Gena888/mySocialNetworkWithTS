import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { AppStateType } from '../redux/redux-store';
import React from 'react'


let mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
} as MapPropsType)

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {
}

// WCP - wrapped component props 

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let { isAuth, ...restProps } = props
        if (!isAuth) return <Redirect to={'/Login'} />

        return <WrappedComponent {...restProps as unknown as WCP} />
    }

    let ConnectedRedirectComponent = connect
        <MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {})
        (RedirectComponent);
    return ConnectedRedirectComponent;

}

