import { v4 } from 'uuid';

import Users from '../users/Users';
import { isUuid } from '../utils/isUuid';

export const addUser = async (data: string) => {
  try {
    const { username, age, hobbies } = JSON.parse(data);
    if (
      typeof username === 'string'
      && typeof age === 'number'
      && Array.isArray(hobbies)
    ) {
      const user = {
        id: v4(),
        username,
        age,
        hobbies,
      };
      console.log(user);

      const newUser = await Users.addUser(user);

      return {
        status: 201,
        header: 'Content-Type: application/json',
        body: JSON.stringify(newUser),
      };
    }
  } catch (error) {
    console.log(error);
    return {
      status: 400,
      header: 'Content-Type: application/json',
      body: JSON.stringify({ message: 'Request is incorrect.' }),
    };
  }

  return {
    status: 400,
    header: 'Content-Type: application/json',
    body: JSON.stringify({ message: 'Check the fields being entered' }),
  };
};

export const getUserById = async (id: string) => {
  if (!isUuid(id)) {
    return {
      status: 400,
      header: 'Content-Type: application/json',
      body: JSON.stringify({ message: `${id} is not valid` }),
    };
  }

  const user = await Users.getUserById(id);
  const message =  {
    message: `User with this ${id} was not found.`
  };

  return {
    status: user ? 200 : 404,
    header: 'Content-Type: application/json',
    body: JSON.stringify(user ? user : message),
  };
};


export const getAllUsers = async () => {
  const users = await Users.getUsers();

  return {
    status: 200,
    header: 'Content-Type: application/json',
    body: JSON.stringify(users),
  };
};