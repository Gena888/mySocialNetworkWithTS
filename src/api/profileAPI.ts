import { PostPutDeleteRegularResponse, ProfileApiType, ProfilePhotoApiType } from "../types/apiTypes";
import { ProfileType } from "../types/types";
import { instanse } from "./api";



export const profileAPI = {
    getProfileData(profileId: number) {
        return instanse.get<ProfileApiType>('profile/' + profileId)
            .then(response => response.data);
    },
    getStatus(userId: number) {
        return instanse.get<string>('profile/status/' + userId)
            .then(response => response.data);
    },
    updateStatus(status: string) {
        return instanse.put<PostPutDeleteRegularResponse>('profile/status/', { status: status })
            .then(response => response.data);
    },
    putNewPhoto(photoFile: any) {
        let formData = new FormData();
        formData.append('image', photoFile);
        return instanse.put<ProfilePhotoApiType>('profile/photo', formData, {
            headers: {
                'Content-Type': 'mulipart/form-data'
            }
        })
            .then(response => response.data);
    },
    saveProfile(profile: ProfileType) {
        return instanse.put<PostPutDeleteRegularResponse>('profile', profile)
            .then(response => response.data);
    }
};
