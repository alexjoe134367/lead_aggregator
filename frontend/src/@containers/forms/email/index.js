import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';

const mapStateToProps = state => ({
    form: state.forms.email,
    show: state.forms.email.show,
});

const mapDispatcherToState = dispatch => ({
    showModal: (form) => dispatch(actions.showModal(form)),                 //Modal Show
    changeForm: form => dispatch(actions.changeForm(form)),                 //when form values changed
    sendEmail: form => dispatch(thunks.sendEmail(form)),                      //save in connect modal or project modal
    closeForm: email => dispatch(actions.closeForm(email)),                //modal close

    // createProject: project => dispatch(actions.createProject(project)),     //when add blank project clicked

});

export default connect(mapStateToProps, mapDispatcherToState);