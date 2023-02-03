import { connect } from 'react-redux';
import * as thunks from './thunks';
import * as actions from './actions';

const mapStateToProps = state => ({
    form: state.forms.builder,
    show: state.forms.builder.show,
});

const mapDispatcherToState = dispatch => ({
    
    showModal: (form) => dispatch(actions.showModal(form)),//Modal Show
    changeForm: form => dispatch(actions.changeForm(form)),//when form values changed
    saveForm: form => dispatch(thunks.saveForm(form)),//save in connect modal or project modal
    loadForm: builder => dispatch(actions.closeForm(builder)),//modal close

    createProject: project => dispatch(actions.createProject(project)),//when add blank project clicked    
});

export default connect(mapStateToProps, mapDispatcherToState);