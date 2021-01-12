import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { maxLengthCreator, required } from '../../../Utils/Validators/Validaors';
import { Textarea } from '../../Common/FormsControls/FormsControls';
import { createField } from './../../Common/FormsControls/FormsControls';
import { postDataType, ProfileType } from '../../../types/types';


export type MapPropsType = {
    postsData: Array<postDataType>
}

export type MapDispatchPostsType = {
    addPost: (newTextBody: string) => void
    resetForm: (formName: string) => void
}

type OwnPropsType = {
    profile: ProfileType | null
}

const MyPosts: React.FC<MapPropsType & MapDispatchPostsType & OwnPropsType> = (props) => {
    let postsElement = props.postsData.map(postEl => <Post profile={props.profile && props.profile} key={postEl.id} likes={postEl.likes} message={postEl.message} />)

    // отсюда берём values для типа AddPostFormValuesType
    // а потом тип из формы AddPostFormValuesType указываем для values в onAddNewPost
    let onAddNewPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newTextBody);
        props.resetForm('newPost')
    }
    return (
        <div className={s.postsBlock} >
            <h3> My posts</h3>
            <ReduxAddPost onSubmit={onAddNewPost} />
            {postsElement}
            <div className={s.posts}>
            </div>
        </div>
    );
}

const MyPostsMemorized = React.memo(MyPosts)

const maxLength = maxLengthCreator(100);
// пропсы входные для формы
type AddPostOwnPropsType = {
}

export type AddPostFormValuesType = {
    newTextBody: string
}
// значения для формы

// в форму приходят injectedFormProps из (inj. из redux(типы для handlesubmin и тд.) + OwnProps)
// и передаём own прорс вместе с injected props для формы через - &

type AddPostFormValuesTypeKeys = Extract<keyof AddPostFormValuesType, string>

const addPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, AddPostOwnPropsType> & AddPostOwnPropsType> = (props) => {
    return (
        <form className={s.addPostForm} onSubmit={props.handleSubmit}>
            {createField<AddPostFormValuesTypeKeys>([required, maxLength], 'Enter your message', Textarea, 'newTextBody', 'text', '1')}
            <div className={s.addPostButton}>
                <button>Post</button>
            </div>
        </form>
    )
}

const ReduxAddPost = reduxForm<AddPostFormValuesType, AddPostOwnPropsType>({
    form: 'newPost'
})(addPostForm)




export default MyPostsMemorized;