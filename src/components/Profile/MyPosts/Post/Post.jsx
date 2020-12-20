import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (

        <div className={s.item}>
            <div className={s.postInfo}>
                <div>
                    <img className={s.itemImg} src={props.profile && props.profile.photos.large} alt="" />
                </div>
                <div className={s.likes}>
                    <span>{props.likes} likes</span>
                </div>

            </div>
            <div className={s.textInfo}>
                <div>
                    {props.message}
                </div>

            </div>

        </div>


    );
}

export default Post;