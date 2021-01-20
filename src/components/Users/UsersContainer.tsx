import { useSelector } from 'react-redux';
import React from 'react';
import Preloader from '../Common/Preloader/Preloader';
import { getIsFetching } from '../../redux/selectors/user-selectors';
import Users from './Users';

type PropsType = {
}

export const UsersPage: React.FC<PropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>)
}





