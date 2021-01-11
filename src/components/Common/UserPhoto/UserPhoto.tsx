import React from 'react';
import noUserPhoto from '../../../imagas/no-avatar.png'
import { ProfileType, UsersType } from '../../../types/types';

export const isUserImgSmall = (user: UsersType) => {
    return user.photos.small !== null
        ? user.photos.small
        : noUserPhoto

}

export const isUserImgLarge = (profile: ProfileType) => {
    return profile.photos.large !== null
        ? profile.photos.large
        : profile.photos.small !== null
            ? profile.photos.small
            : noUserPhoto
}





