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
    return newUsers.length === this._users.length;
  }

  async updateUser(userId: string, propsForUser: Partial<User>) {
    const userToUpdate = this.getUserById(userId);

    if (!userToUpdate) {
      return false;
    }

    Object.assign(userToUpdate, propsForUser);
    return true;
  }
}

export default new Users();
