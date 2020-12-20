import dialogsReducer from "./dialogs-reducer";
import navReducer from "./nav-reducer";
import profileReducer from "./profile-reducer";



let store = {
    _state: {
        profilePage: {
            postsData: [
                { id: 1, likes: 121, message: 'hallow it.s me' },
                { id: 2, likes: 231, message: 'it is my firs post' },
                { id: 3, likes: 321, message: 'second post hear' }
            ],
            newPostText: 'it-camasutra'
        },
        dialogsPage: {
            dialogsData: [
                { id: 1, imgSrc: 'https://sun1.beltelecom-by-minsk.userapi.com/c847220/v847220418/c6148/DDmHnFk6Uvw.jpg', name: 'gena' },
                { id: 2, imgSrc: 'https://sun1.beltelecom-by-minsk.userapi.com/c627716/v627716457/2f13c/k4JKIT907iM.jpg', name: 'sasha' },
                { id: 3, imgSrc: 'https://sun9-4.userapi.com/c854216/v854216683/1adb0e/RPXbHPkU0U0.jpg', name: 'dima' },
                { id: 4, imgSrc: 'https://sun1.beltelecom-by-minsk.userapi.com/c844417/v844417074/6d041/N75krJg5dtc.jpg', name: 'igor' },
                { id: 5, imgSrc: 'https://sun9-18.userapi.com/cqGGLrpxAgHQf0x5w9-mtcIKXXXNyF50BocQyA/eAjdupisXrU.jpg', name: 'gleb' }
            ],
            messagesData: [
                { id: 1, message: 'hi', addresserYou: true },
                { id: 2, message: 'how are you', addresserYou: false },
                { id: 3, message: 'yo', addresserYou: true },
                { id: 4, message: 'yo', addresserYou: true },
                { id: 5, message: 'yo', addresserYou: true }
            ],
            newMessageTextData: ' '
        },
        navPage: {
            navFriendsData: [
                { id: 1, imgSrc: 'https://sun1.beltelecom-by-minsk.userapi.com/c627716/v627716457/2f13c/k4JKIT907iM.jpg', name: 'sasha' },
                { id: 2, imgSrc: 'https://sun9-4.userapi.com/c854216/v854216683/1adb0e/RPXbHPkU0U0.jpg', name: 'dima' },
                { id: 3, imgSrc: 'https://sun1.beltelecom-by-minsk.userapi.com/c844417/v844417074/6d041/N75krJg5dtc.jpg', name: 'igor' },
                { id: 4, imgSrc: 'https://sun9-18.userapi.com/cqGGLrpxAgHQf0x5w9-mtcIKXXXNyF50BocQyA/eAjdupisXrU.jpg', name: 'gleb' }
            ]
        }
    },

    _callSubscriber() {
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) { 
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.navPage = navReducer(this._state.navPage, action);
        this._callSubscriber(this._state);

    }

}




export default store;
window.store = store;



