import { CLOSE_FORM, SEND_EMAIL, SHOW_MODAL, CHANGE_FORM } from './actions';

// const typesForLabel = ['Project', 'Domain', 'Template', 'Setting'];

const initState = {
  subject: '',
  content: '',

  isNew: true,
  show: false,
  title: '',

  id: 0,
  category_id: 0,
  company: 0,
  domain: 0
};

const emailForm = (state = initState, action) => {
  switch (action.type) {
    //Manage Modal
    case SHOW_MODAL: {
      let title = 'Send Email';
      
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
    case SEND_EMAIL: {
      return {
        ...state,
        ...action.form,
      };
    }
    // //Page Manage Reducer
    // case CREATE_PROJECT: {
    //   let title = action.form.isTemplate === true ? 'Create Template' : 'Create Page';
    //   localStorage.setItem('gjsProject', action.form.gjsProject);

    //   return {
    //     ...state,
    //     ...action.form,
    //     title: title
    //   };
    // }
    default: {
      return state;
    }
  }
};

export default emailForm;
