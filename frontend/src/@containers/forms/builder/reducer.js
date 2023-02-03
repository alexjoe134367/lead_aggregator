import {SHOW_MODAL,CREATE_PROJECT,SAVED_FORM,CLOSE_FORM,CHANGE_FORM, } from './actions';

// const typesForLabel = ['Project','Domain','Template'];

const initState = {
  show:false,
  type:0,
  id:0,
  name:'',
  title:'',
  //for duplicate
  editor:'',
  //for seo setting
  pagetitle:'',
  description:'',
};

const builderForm = (state = initState, action) => {
  switch (action.type) {
    //Manage Modal
    case SHOW_MODAL:{
      return{
        ...state,
        ...action.form,
        title:action.form.type === 0 ? 'Create Page' : (action.form.type === 1 ? 'Create Duplicate Page' : 'Page Seo Settings')
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
        name:'',
        pagetitle:'',
        description:'',
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
      localStorage.setItem('gjsProject',action.form.gjsProject);

      return {
        ...state,
        ...action.form,
        title:title
      };
    }
    default: {
      return state;
    }
  }
};

export default builderForm;