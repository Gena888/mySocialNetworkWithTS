import { connect } from 'react-redux';
import { addNewMessageAC } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../Hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { reset } from 'redux-form';
import { DialogsInilialStateType } from './../../redux/dialogs-reducer'
import { dialogsDataType, messagesDataType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStateType = {
    dialogsData: Array<dialogsDataType>
    messagesData: Array<messagesDataType>
}

type MapDispatchType = {
    sendMessage: (newMessageBody: string) => void
    resetForm: (formName: string) => void
}


let mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData
        // newMessageTextData: state.dialogsPage.newMessageTextData,

    }
}

let mapDispatchToProps = (dispatch: any): MapDispatchType => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(addNewMessageAC(newMessageBody));
        },
        resetForm: (formName) => {
            dispatch(reset(formName));
        }

    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
    withRouter
)(Dialogs)

