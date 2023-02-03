import { CREATE_PROJECT, SAVED_FORM, CLOSE_FORM, CHANGE_FORM, SHOW_MODAL } from './actions';

const typesForLabel = ['Project', 'Domain', 'Template', 'Setting'];

const initState = {
  type: 0,
  changeable: '',
  isNew: true,
  show: false,
  title: '',

  id: 0,
  category_id: 0,
  company: 0,
  domain: 0
};

const domainForm = (state = initState, action) => {
  switch (action.type) {
    //Manage Modal
    case SHOW_MODAL: {
      let title = (action.form.type === 1 ? 'Connect' : 'Create') + ' ' + typesForLabel[action.form.type];
      if (action.form.type === 3) {
        title = "Project Setting";
      }
      return {
        ...state,
        ...action.form,
        title: title
      }
    }
    case CHANGE_FORM: {
      return {
        ...state,
        ...action.form,
      };
    }
    case CLOSE_FORM: {
      return {
        ...state,
        ...action.form,
        changeable: '',
        company: '',
        show: false,
      };
    }
    case SAVED_FORM: {
      return {
        ...state,
        ...action.form,
        show: false,
      };
    }
    //Page Manage Reducer
    case CREATE_PROJECT: {
      let title = action.form.isTemplate === true ? 'Create Template' : 'Create Page';
      localStorage.setItem('gjsProject', action.form.gjsProject);

      return {
        ...state,
        ...action.form,
        title: title
      };
    }
    default: {
      return state;
    }
  }
};

export default domainForm;
