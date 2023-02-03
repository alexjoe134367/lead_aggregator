import { GET_PAGES, ADD_PAGE, EDIT_PAGE, EDIT_PAGE_SETTING, DELETE_PAGE } from './actions';

const initState = {
  pages: [],
  editor: ''
};

const Project = (state = initState, action) => {
  let key;
  switch (action.type) {
    case GET_PAGES: {
      return {
        ...state,
        pages: [...action.pages]
      };
    }
    case ADD_PAGE: {
      return {
        ...state,
        pages: [...state.pages, { ...action.page }]
      };
    }
    case EDIT_PAGE: {
      state.pages.map((page, index) => {
        if (page.id === action.page.page_id) {
          key = index;
        }
      });
      state.pages[key].gjs = action.page.gjs;
      return {
        ...state,
        pages: [...state.pages]
      };
    }

    case EDIT_PAGE_SETTING: {
      state.pages.map((page, index) => {
        if (page.id === action.page.page_id) {
          key = index;
        }
      });
      state.pages[key].name = action.page.name;
      state.pages[key].title = action.page.title;
      state.pages[key].description = action.page.description;

      return {
        ...state,
        pages: [...state.pages]
      };
    }
    case DELETE_PAGE: {
      const pages = state.pages.filter(page => page.id !== action.page_id);
      return {
        ...state,
        pages: [...pages]
      };
    }
    default: {
      return state;
    }
  }
};

export default Project;
