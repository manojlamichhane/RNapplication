import {
  ADD_USER,
  GET_USER,
  AFTER_LOGIN,
  ADD_CONTACT,
  GET_CONTACT,
} from "./contactType";

const initialState = {
  users: [],
  contacts: [],
  isLogged: false,
  LoggedUser: {},
};

export const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        users: [action.value, ...state.users],
      };
    }
    case AFTER_LOGIN: {
      return {
        isLogged: true,
        LoggedUser: action.value,
      };
    }
    case ADD_CONTACT: {
      return {
        ...state,
        contacts: [...state.contacts, action.value],
      };
    }
    case GET_USER: {
      return {
        ...state,
        users: [...action.value, ...state.users],
      };
    }
    case GET_CONTACT: {
      return {
        ...state,
        contacts: [...action.value, ...state.contacts],
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
