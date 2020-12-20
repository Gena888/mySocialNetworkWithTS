import * as axios from "axios";


const instanse = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '9612377a-0b39-4432-abc2-9856cf3bb343'
    }
}
);



export const userAPI = {
    unfollowUser(id) {
        return instanse.delete(`follow/${id}`)
            .then(response => response.data)
    },


    followUser(id) {
        return instanse.post(`follow/${id}`, {})
            .then(response => response.data)
    },

    getUsers(currentPage, pageSize) {
        return instanse.get(`users?page=${currentPage}&count=${pageSize} `)
            .then(response => response.data)
    },

    getUsers2(pageNumber, pageSize) {
        return instanse.get(`users?page=${pageNumber}&count=${pageSize}`)
            .then(response => response.data)
    }

}

export const profileAPI = {
    getProfileData(profileId) {
        return instanse.get('profile/' + profileId)
            .then(response => response.data)
    },

    getStatus(userId) {
        return instanse.get('profile/status/' + userId)
            .then(response => response.data)
    },

    updateStatus(status) {
        return instanse.put('profile/status/', { status: status })
            .then(response => response.data)
    },
    putNewPhoto(photoFile) {
        let formData = new FormData();
        formData.append('image', photoFile)
        return instanse.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'mulipart/form-data'
            }
        })
            .then(response => response.data)
    },
    saveProfile(profile) {
        return instanse.put('profile', profile)
            .then(response => response.data)
    }

}


export const authAPI = {

    me() {
        return instanse.get('auth/me')
            .then(response => response.data)

    },

    Login(email, password, rememberMe = false, captcha = null) {
        return instanse.post('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        })
            .then(response => response.data)
    },

    Logout() {
        return instanse.delete('auth/login')
            .then(response => response.data)
    }

}

export const securityAPI = {
    getCaptchaUrt() {
        return instanse.get('security/get-captcha-url')
            .then(response => response.data)
    }
}


