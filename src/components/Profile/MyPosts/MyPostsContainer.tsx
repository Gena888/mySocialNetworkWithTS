import { connect } from 'react-redux';
import { addNewPostAC } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import { reset } from 'redux-form';
import { postDataType, ProfileType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux-store';


type MapStateType = {
    postsData: Array<postDataType>
    newPostText: string
}

type MapDispatchType = {
    addPost: (newTextBody: string) => void
    resetForm: (formName: string) => void
}

type OwnPropsType = {
    profile: ProfileType | null
}

const mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        postsData: state.profilePage.postsData,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch: any): MapDispatchType => {
    return {

        addPost: (newTextBody: string) => {
            dispatch(addNewPostAC(newTextBody));
        },
        resetForm: (formName: string) => {
            dispatch(reset(formName));
        }
    }
}

const MyPostsContainer = connect<MapStateType, MapDispatchType, OwnPropsType, AppStateType>
    (mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;