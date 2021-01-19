import { GetUserType, PostPutDeleteRegularResponse } from "../types/apiTypes";
import { instanse } from "./api";



export const userAPI = {
    unfollowUser(id: number) {
        return instanse.delete<PostPutDeleteRegularResponse>(`follow/${id}`)
            .then(response => response.data);
    },
    followUser(id: number) {
        return instanse.post<PostPutDeleteRegularResponse>(`follow/${id}`, {})
            .then(response => response.data);
    },
    getUsers(currentPage: number, pageSize: number, term: string = '', friend: null | boolean = null) {
        return instanse.get<GetUserType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null  ? '' : `&friend=${friend}` ) )
            .then(response => response.data);
    },
    getUsers2(pageNumber: number, pageSize: number) {
        return instanse.get<GetUserType>(`users?page=${pageNumber}&count=${pageSize}`)
            .then(response => response.data);
    }
};
