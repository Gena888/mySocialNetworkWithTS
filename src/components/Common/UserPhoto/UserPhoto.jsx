import React from 'react';
import noUserPhoto from '../../../imagas/no-avatar.png'

export const isUserImgSmall = (user) => {
    return user.photos.small !== null
        ? user.photos.small
        : noUserPhoto

}

export const isUserImgLarge = (profile) => {
    return profile.photos.large !== null
        ? profile.photos.large
        : profile.photos.small !== null
            ? profile.photos.small
            : noUserPhoto
}





