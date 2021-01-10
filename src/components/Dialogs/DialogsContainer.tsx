import { connect } from 'react-redux';
import { dialogsReduserActions } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../Hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { reset } from 'redux-form';
import { dialogsDataType, messagesDataType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';

type MapStateType = {
    dialogsData: Array<dialogsDataType>
    messagesData: Array<messagesDataType>
}

// type MapDispatchType = {
//     sendMessage: (newMessageBody: string) => void
//     resetForm: (formName: string) => void
// }

let mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        dialogsData: state.dialogsPage.dialogsData,
        messagesData: state.dialogsPage.messagesData
        // newMessageTextData: state.dialogsPage.newMessageTextData,

    }
}


export default compose(
    connect(mapStateToProps, {
        sendMessage: dialogsReduserActions.addNewMessageAC, resetForm: reset
    }),
    withAuthRedirect,
    withRouter
)(Dialogs)

