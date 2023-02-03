//Modal Open
export const LOAD_DOMAIN = 'LOAD_DOMAIN';
export const NEW_DOMAIN = 'NEW_DOMAIN';
export const CREATE_PROJECT = 'CREATE_PROJECT';
//Modal SAVE or CLOSE
export const SAVED_FORM = 'SAVED_FORM';
export const CLOSE_FORM = 'CLOSE_FORM';
export const CHANGE_FORM = 'CHANGE_FORM';
export const SEL_DOMAIN = 'SEL_DOMAIN';

export const SHOW_MODAL = 'SHOW_MODAL';
//modal show
export const showModal = (form) =>({
  type:SHOW_MODAL,
  form,
});
//when change form values
export const changeForm = form => ({
  type: CHANGE_FORM,
  form,
});

//when click add blank PROJECT button
export const createProject = form => ({
  type: CREATE_PROJECT,
  form,
});
//when click cancel in the modal
export const closeForm = form => ({
  type: CLOSE_FORM,
  form,
});
//When click save button
export const saveForm = (form) => ({
  type: SAVED_FORM,
  form
});