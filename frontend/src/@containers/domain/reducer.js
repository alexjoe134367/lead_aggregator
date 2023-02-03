import {
  ADD_CONNECT,
  ADD_DATAS,
  ADD_DOMAIN,
  UPDATE_DOMAIN,
  EDIT_PROJECT,
  DEL_PROJECT,
  EDIT_PROJECT_PREVIEW,
  EDIT_CONNECT,
  DEL_TEMPLATE,
  EDIT_TEMPLATE_PREVIEW,
  DELETE_DOMAIN,
  REMOVE_CONNECT,
} from "./actions";

const initState = {
  projects: [],
  domains: [],
  templates: [],
  connects: [],
  user_info: null,

};

const domainForm = (state = initState, action) => {
  let key;
  switch (action.type) {
    case ADD_DATAS: {
      return {
        ...state,
        projects: [...action.projects],
        domains: [...action.domains],
        templates: [...action.templates],
        connects: [...action.connects],
        user_info: action.user_info,

      };
    }
    case ADD_DOMAIN: {
      return {
        ...state,
        domains: [...state.domains, { ...action.domain }],
      };
    }
    case UPDATE_DOMAIN: {
      let updateState = state.domains.map((item) => {
        if (item.id === action.domain.id) {
          item.name = action.domain.changeable;
        }
      });
      return {
        ...state,
        updateState,
      };
    }
    case DELETE_DOMAIN: {
      return {
        ...state,
        domains: state.domains.filter((item) => item.id !== action.id),
      };
    }
    case ADD_CONNECT: {
      var project_key = -1;
      var domain_key = -1;
      if (action.flag === 2){
        state.connects.map((connect, index) => {
          if (connect.project_id === action.connect.id) {
            project_key = index;
          }
        });
        
        state.connects.splice(project_key, 1);
        return {
          ...state,
          connects: [...state.connects],
        };
      }
    
      state.connects.map((connect, index) => {
        if (connect.domain_id === action.connect.domain_id) {
          domain_key = index;
        }
      });
      if(domain_key !== -1){
        state.connects.splice(domain_key, 1);
      }
      state.connects.map((connect, index) => {
        if (connect.project_id === action.connect.project_id) {
          project_key = index;
        }
      });
      if(project_key !== -1){
        state.connects.splice(project_key, 1);
      }
      return {
        ...state,
        connects: [...state.connects, action.connect],
      };
    }
    case EDIT_CONNECT: {
      project_key = -1;
      domain_key = -1;
      if (action.flag === 2){
        console.log("state.connects", state.connects, "====", action.connect);
        state.connects.map((connect, index) => {
          if (connect.project_id === action.connect.project_id) {
            project_key = index;
          }
        });

        state.connects.splice(project_key, 1);
        return {
          ...state,
          connects: [...state.connects],
        };
      }
      state.connects.map((connect, index) => {
        if (connect.domain_id === action.connect.domain_id) {
          domain_key = index;
        }
      });
      if(domain_key !== -1){
        state.connects.splice(domain_key, 1);
      }
      state.connects.map((connect, index) => {
        if (connect.project_id === action.connect.project_id) {
          project_key = index;
        }
      });
      if(project_key !== -1){
        state.connects.splice(project_key, 1);
      }
      return {
        ...state,
        connects: [...state.connects, action.connect],
      };
    }
    case DEL_PROJECT: {
      state.projects = state.projects.filter((project) => {
        return project.id !== action.pid;
      });
      state.connects = state.connects.filter((connect) => {
        return connect.project_id !== action.pid;
      });

      return {
        ...state,
        projects: [...state.projects],
        connects: [...state.connects],
      };
    }
    case EDIT_PROJECT_PREVIEW: {
      state.projects.map((project, index) => {
        if (project.id == action.project.project_id) {
          key = index;
        }
      });
      state.projects[key] = {
        ...state.projects[key],
        preview_image: action.project.preview_image,
      };

      return {
        ...state,
        projects: [...state.projects],
      };
    }

    case EDIT_TEMPLATE_PREVIEW: {
      state.templates.map((template, index) => {
        if (template.id === action.template.selCard) {
          key = index;
        }
      });
      state.templates[key].preview_image = action.template.src;

      return {
        ...state,
        templates: [...state.templates],
      };
    }
    case DEL_TEMPLATE: {
      state.templates = state.templates.filter((template) => {
        return template.id !== action.tid;
      });

      return {
        ...state,
        template: [...state.template],
      };
    }
    default: {
      return state;
    }
  }
};

export default domainForm;
