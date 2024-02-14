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

      const newUser = await Users.addUser(user);

      return {
        status: 201,
        header: 'Content-Type: application/json',
        body: JSON.stringify(newUser),
      };
    }
  } catch (error) {
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
  const message = {
    message: `User with this ID: ${id} was not found.`,
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

export const updateUser = async (props: { id: string, data: string }) => {
  try {
    const {
      id,
      data,
    } = props;

    if (!isUuid(id)) {
      return {
        status: 400,
        header: 'Content-Type: application/json',
        body: JSON.stringify({ message: `${id} is not valid` }),
      };
    }

    const { username, age, hobbies } = JSON.parse(data);
    const userByID = await Users.getUserById(id);

    const updateDataForUser = {
      username: username ?? userByID?.username,
      age: age ?? userByID?.age,
      hobbies: hobbies ?? userByID?.hobbies,
    };
    const { isFound, user } = await Users.updateUser(id, updateDataForUser);

    if (!isFound) {
      return {
        status: 404,
        header: 'Content-Type: application/json',
        body: JSON.stringify({ message: `User with this ID: ${id} was not found.` }),
      };
    }

    return {
      status: 200,
      header: 'Content-Type: application/json',
      body: JSON.stringify(user),
    };
  } catch (e) {
    return {
      status: 400,
      header: 'Content-Type: application/json',
      body: JSON.stringify({ message: 'Request is incorrect.' }),
    };
  }
};

export const deleteUser = async (id: string) => {
  try {
    if (!isUuid(id)) {
      return {
        status: 400,
        header: 'Content-Type: application/json',
        body: JSON.stringify({ message: `${id} is not valid` }),
      };
    }


    const isDelete = await Users.deleteUser(id);

    if (isDelete) {
      return {
        status: 404,
        header: 'Content-Type: application/json',
        body: JSON.stringify({ message: `User with this ID: ${id} was not found.` }),
      };
    }

    return {
      status: 204,
      header: 'Content-Type: application/json',
      body: JSON.stringify({ message: `The user ${id} was deleted successfully.` }),
    };
  } catch (e) {
    return {
      status: 400,
      header: 'Content-Type: application/json',
      body: JSON.stringify({ message: 'Request is incorrect.' }),
    };
  }
};
