import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../Hoc/withAuthRedirect';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';



export default compose<React.ComponentType>(
    withAuthRedirect,
    withRouter
)(Dialogs)

