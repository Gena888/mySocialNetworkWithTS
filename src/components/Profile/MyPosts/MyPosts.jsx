import React from 'react';
import Post from './Post/Post';
import s from './MyPosts.module.css';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from './../../../Utils/Validators/Validaors';
import { Textarea } from './../../Common/FormsControls/FormsControls';



const MyPosts = React.memo((props) => {
    let postsElement = props.postsData.map(postEl => <Post profile={props.profile && props.profile} key={postEl.id} likes={postEl.likes} message={postEl.message} />)

    let onAddNewPost = (values) => {
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

})

const maxLength = maxLengthCreator(100);


const addPost = (props) => {
    return (
        <form className={s.addPostForm} onSubmit={props.handleSubmit}>
            <Field rows={1} validate={[required, maxLength]}
                component={Textarea} name={'newTextBody'}
                placeholder={'Enter your message'} />
            <div className={s.addPostButton}>
                <button>Post</button>
            </div>
        </form>
    )
}

const ReduxAddPost = reduxForm({
    form: 'newPost'
})(addPost)




export default MyPosts;