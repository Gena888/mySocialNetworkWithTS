import Richard from './../friendsIcons/recherd.png';
import Erlich from './../friendsIcons/bahnam.png';
import Gilfoyle from './../friendsIcons/gilfoyle.png';
import Dinesh from './../friendsIcons/dinesh.png';

export type InitialStateType = typeof initialState

type NavFriendsDataType = {
    id: number
    imgSrc: string
    name: string
}

let initialState = {
    navFriendsData: [
        { id: 1, imgSrc: Erlich, name: 'Erlich' },
        { id: 2, imgSrc: Richard, name: 'Richard' },
        { id: 3, imgSrc: Gilfoyle, name: 'Gilfoyle' },
        { id: 4, imgSrc: Dinesh, name: 'Dinesh' }
    ] as Array<NavFriendsDataType>
};

const navReducer = (state = initialState, action: any): InitialStateType => {

    return state;
}

export default navReducer;