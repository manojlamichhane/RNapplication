import {
  ADD_USER,
  GET_USER,
  AFTER_LOGIN,
  ADD_CONTACT,
  GET_CONTACT,
} from "./contactType";
import axios from "axios";

const BASE_URL = "https://rnapi-eeef7-default-rtdb.firebaseio.com";

const getUser = (users) => {
  return {
    type: GET_USER,
    value: users,
  };
};
const getContact = (contact) => {
  return {
    type: GET_CONTACT,
    value: contact,
  };
};
export const afterLogin = (user) => {
  return {
    type: AFTER_LOGIN,
    value: user,
  };
};
const addUser = (user) => {
  return {
    type: ADD_USER,
    value: user,
  };
};
const addContact = (user) => {
  return {
    type: ADD_CONTACT,
    value: user,
  };
};

export const getUsers = () => async (dispatch) => {
  const response = await axios.get(`${BASE_URL}/users.json`);
  const usersId = Object.keys(response.data);
  const users = usersId.map((userId) => {
    const user = response.data[userId];
    user.id = userId;
    return user;
  });
  dispatch(getUser(users));
};

export const getContacts = () => async (dispatch) => {
  const reponse = await axios.get(
    `${BASE_URL}/users/-MVbiCyr7TDza2oibkZu/contacts.json`
  );
  const contactsId = Object.keys(response.data);
  const contacts = contactsId.map((contactId) => {
    const contact = response.data[contactId];
    contact[id] = contactId;
    return contact;
  });
  dispatch(getContact(contacts));
};

export const addContactToFirebase = (contact) => async (dispatch) => {
  const response = axios.post(
    `${BASE_URL}/users/-MVbiCyr7TDza2oibkZu/contacts.json`,
    contact
  );
  contact.id = response.data.name;
  dispatch(addContact(contact));
};

export const addUsersToFirebase = (user) => async (dispatch) => {
  const response = await axios.post(`${BASE_URL}/users.json`, user);
  user.id = response.data.name;
  dispatch(addUser(user));
};
