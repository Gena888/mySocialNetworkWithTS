import { connect } from 'react-redux';
import { profileReducerActions } from '../../../redux/profile-reducer';
import MyPosts, { MapDispatchPostsType, MapPropsType } from './MyPosts';
import { reset } from 'redux-form';
import { postDataType, ProfileType } from '../../../types/types';
import { AppStateType } from '../../../redux/redux-store';


const mapStateToProps = (state: AppStateType) => {
    return {
        postsData: state.profilePage.postsData,
    }
}

const MyPostsContainer = connect<MapPropsType, MapDispatchPostsType, {}, AppStateType>(mapStateToProps, {
    addPost: profileReducerActions.addNewPostAC, resetForm: reset
})(MyPosts);

export default MyPostsContainer; 