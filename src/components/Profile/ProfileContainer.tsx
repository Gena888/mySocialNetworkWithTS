import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Profile from './Profile';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getAutorisedUserId } from './../../redux/selectors/profile-selectors';
import { getStatusThunk, getProfileDataThunk } from './../../redux/profile-reducer';
import { usePrevious } from './../Hooks/usePreviouse';
import Preloader from './../Common/Preloader/Preloader';


type PathParamsType = {
    userId: string
}
type RoutePropsType = RouteComponentProps<PathParamsType>
type PropsType = RoutePropsType


// + преобразование 
const ProfilePage: React.FC<PropsType> = React.memo((props) => {
    const dispatch = useDispatch()
    const getStatus = (userId: number | null) => {
        dispatch(getStatusThunk(userId))
    }
    const getProfileData = (userId: number | null) => {
        dispatch(getProfileDataThunk(userId))
    }
    const autorisedUserId = useSelector(getAutorisedUserId)

    useEffect(() => {
        refreshProfile()
    }, [])

    const prevMatch: any = usePrevious(props.match)
    useEffect(() => {
        if (props.match.params.userId != prevMatch?.params.userId) {
            refreshProfile()
        }
    })


    let refreshProfile = () => {
        let userId: number | null = +props.match.params.userId;
        if (!userId) {
            userId = autorisedUserId;
            if (!userId) {
                props.history.push('/Login')
                // push history в любом месте кода берёт и меняет URL. условной альтернативой может быть redirect
            }
        }
        getProfileData(userId);
        getStatus(userId);
    }
    
    return (
        <div>
            <Profile
                isOwner={!props.match.params.userId} />
        </div>
    )
})


export default compose<React.ComponentType>(
    withRouter,
    // withAuthRedirect
)(ProfilePage)