import React from 'react';
import { postDataType, ProfileType } from '../../../../types/types';
import s from './Post.module.css';

type PostType = {
    profile: ProfileType | null
    likes: number
    message: string
}



const Post: React.FC<PostType> = (props) => {
    if (!props.profile) {
    } else {
        var imgSrc = props.profile.photos.large
    }

    return (

        <div className={s.item}>
            <div className={s.postInfo}>
                <div>
                    {/* <img className={s.itemImg} src={props.profile && props.profile.photos.large} alt="" /> */}
                    <img className={s.itemImg} src={imgSrc} alt="" />
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