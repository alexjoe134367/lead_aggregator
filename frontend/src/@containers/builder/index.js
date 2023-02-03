import { connect } from 'react-redux';
import * as thunks from './thunks';

const mapStateToProps = state => ({
    pages: state.builder.pages,
    user: state.profile
});

const mapDispatcherToState = dispatch => ({
    init: () => dispatch(thunks.initData()),
    savePage: (editor, pageID, preview) => dispatch(thunks.savePage(editor, pageID, preview)),
    deletePage: (pageID) => dispatch(thunks.deletePage(pageID)),
});

export default connect(mapStateToProps, mapDispatcherToState);