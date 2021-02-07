import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { reduxForm, InjectedFormProps, reset } from 'redux-form';
import { Textarea } from '../Common/FormsControls/FormsControls';
import { maxLengthCreator, required } from '../../Utils/Validators/Validaors';
import { dialogsReduserActions } from './../../redux/dialogs-reducer'
import { createField } from './../Common/FormsControls/FormsControls';
import { useSelector, useDispatch } from 'react-redux';
import { getDialogsData, getMessagesData } from './../../redux/selectors/dialogs-selectors';

type PropsType = {
    match: {
        params: {
            userId: number
        }
    }
}

const Dialogs: React.FC<PropsType> = (props) => {
    const dialogsData = useSelector(getDialogsData)
    const messagesData = useSelector(getMessagesData)

    const dispatch = useDispatch()

    const sendMessage = (newMessageBody: string) => {
        dispatch(dialogsReduserActions.addNewMessageAC(newMessageBody))
    }
    const resetForm = (formName: string) => {
        dispatch(reset(formName))
    }

    let addNewMessage = (values: NewMessageFormType) => {
        sendMessage(values.newMessageBody);
        resetForm('dialogAddMessageForm')
    };

    let dialogsElements =
        dialogsData.map((dialogEl) =>
            <DialogItem paramsUserId={props.match.params.userId} key={dialogEl.id} name={dialogEl.name} id={dialogEl.id} imgSrc={dialogEl.imgSrc} />)
    let messagesElements =
        messagesData.map((messageEl) =>
            <Message key={messageEl.id} message={messageEl.message} addresserYou={messageEl.addresserYou} />)



    return (
        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div className={s.message}>
                    {messagesElements}
                </div>
                <div className={s.messageInput}>
                    <AddMessageFormRedux onSubmit={addNewMessage} />
                </div>
            </div>
        </div>
    );
}

const maxLength50 = maxLengthCreator(50);

export type NewMessageFormType = {
    newMessageBody: string
}

type NewMessageFormTypeKeys = Extract<keyof NewMessageFormType, string>
type AddMessageFormOwnPropsType = {}
const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, AddMessageFormOwnPropsType> & AddMessageFormOwnPropsType>  = (props) => {
    return (
        <form  className={s.dialogsForm} onSubmit={props.handleSubmit}>
          
            {createField<NewMessageFormTypeKeys>([required, maxLength50], 'Enter your message', Textarea, 'newMessageBody', 'text', '1')}
            <div className={s.dialogsButton}>
                <button>Send</button>
            </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormType, AddMessageFormOwnPropsType>({
    form: 'dialogAddMessageForm'
})(AddMessageForm);

export default Dialogs;



