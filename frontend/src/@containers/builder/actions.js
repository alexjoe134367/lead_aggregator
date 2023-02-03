export const LOAD_DOMAIN = 'LOAD_DOMAIN';
export const CHANGE_DOMAIN = 'CHANGE_DOMAIN';
export const SAVED_DOMAIN = 'SAVED_DOMAIN';

export const GET_PAGES = 'GET_PAGES';
export const ADD_PAGE = 'ADD_PAGE';
export const EDIT_PAGE = 'EDIT_PAGE';
export const EDIT_PAGE_SETTING = 'EDIT_PAGE_SETTING';
export const DELETE_PAGE = 'DELETE_PAGE';

export const getPages = (pages) => ({
  type: GET_PAGES,
  pages: pages
});

export const addPage = (page) => ({
  type: ADD_PAGE,
  page: page
});

export const editPage = (page) => ({
  type: EDIT_PAGE,
  page: page
});

export const editPageSetting = (page) => ({
  type: EDIT_PAGE_SETTING,
  page: page
});

export const deletePage = (page_id) => ({
  type: DELETE_PAGE,
  page_id: page_id
})

export const loadDomain = form => ({
  type: LOAD_DOMAIN,
  form,
});

export const savedDomain = () => ({
  type: SAVED_DOMAIN,
});

export const changeDomain = form => ({
  type: CHANGE_DOMAIN,
  form,
});