import { connect } from 'react-redux';
import * as thunks from './thunks';

const mapStateToProps = state => ({
    domains: state.domain.domains,
    templates: state.domain.templates,
    projects: state.domain.projects,
    connects: state.domain.connects,
    user_info: state.domain.user_info,
});

const mapDispatcherToState = dispatch => ({
    init: () => dispatch(thunks.getData()),
    goBuilder: (page) => dispatch(thunks.goBuilder(page)),
    deleteItem: (card) => dispatch(thunks.deleteItem(card)),
    editImage: (card) => dispatch(thunks.editImage(card))
});

export default connect(mapStateToProps, mapDispatcherToState);