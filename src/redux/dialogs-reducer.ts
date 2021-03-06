import Richard from './../friendsIcons/recherd.png';
import Erlich from './../friendsIcons/bahnam.png';
import Gilfoyle from './../friendsIcons/gilfoyle.png';
import Dinesh from './../friendsIcons/dinesh.png';
import { dialogsDataType, messagesDataType } from '../types/types';
import { InferActionTypes } from './redux-store';


export type DialogsInilialStateType = typeof inilialState
export type ActionTypes = InferActionTypes<typeof dialogsReduserActions>


let inilialState = {
    dialogsData: [
        { id: 1, imgSrc: 'https://sun1.beltelecom-by-minsk.userapi.com/c847220/v847220418/c6148/DDmHnFk6Uvw.jpg', name: 'Gena' },
        { id: 2, imgSrc: Erlich, name: 'Erlich' },
        { id: 3, imgSrc: Richard, name: 'Richard' },
        { id: 4, imgSrc: Gilfoyle, name: 'Gilfoyle' },
        { id: 5, imgSrc: Dinesh, name: 'Dinesh' }
    ] as Array<dialogsDataType>,
    messagesData: [
        { id: 1, message: 'Hi, how\'s yours project?', addresserYou: true },
        { id: 2, message: 'Hi, fine, but i cant finish messages page', addresserYou: false },
        { id: 3, message: 'Why?', addresserYou: true },
        { id: 4, message: 'i\'v got no API to interact with messages data', addresserYou: false },
        { id: 5, message: 'Just create a static component with messages', addresserYou: true },
        { id: 6, message: 'Ok bro, i\'ll make something like this, thank\'s you ', addresserYou: false },
        { id: 7, message: 'You are welcome ', addresserYou: true }
    ] as Array<messagesDataType>
}

const dialogsReducer = (state = inilialState, action: ActionTypes): DialogsInilialStateType => {

    switch (action.type) {

        case 'ADD_NEW_MESSAGE':
            let newMessage = action.newMessageBody;
            return {
                ...state,
                messagesData: [...state.messagesData, {
                    id: 6,
                    message: newMessage,
                    addresserYou: false
                }],
            };

        default:
            return state;
    }
}

export const dialogsReduserActions = {
    addNewMessageAC: (newMessageBody: string) => ({ type: 'ADD_NEW_MESSAGE', newMessageBody } as const)
}


export default dialogsReducer;