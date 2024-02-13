import { User } from '../types/types';

class Users {
  private _users: User[] = [];

  async getUsers() {
    return this._users;
  }

  async getUserById(userId: string): Promise<User | undefined> {
    return this._users.find(user => user.id === userId);
  }

  async addUser(user: User) {
    this._users.push(user);
    return user;
  }

  async deleteUser(userId: string) {
    const newUsers = this._users.filter(user => user.id !== userId);
    const isDelete = newUsers.length === this._users.length
    this._users = newUsers;
    return isDelete;
  }

  async updateUser(userId: string, propsForUser: Partial<User>) {
    const userToUpdate = await this.getUserById(userId);

    if (!userToUpdate) {
      return {
        isFound: false,
      };
    }

    Object.assign(userToUpdate, propsForUser);
    return {
      isFound: true,
      user: userToUpdate,
    };
  }
}

export default new Users();
