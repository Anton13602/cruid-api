import { User } from '../types/types';

export class Users {
  private _users: User[] = [];

  getUsers() {
    return this._users;
  }

  getUserById(userId: string): User | undefined {
    return this._users.find(user => user.id === userId);
  }

  addUser(user: User) {
    this._users.push(user);
  }

  deleteUser(userId: string) {
    const newUsers = this._users.filter(user => user.id !== userId);
    return newUsers.length === this._users.length;
  }

  updateUser(userId: string, propsForUser: Partial<User>): boolean {
    const userToUpdate = this.getUserById(userId);

    if (!userToUpdate) {
      return false;
    }

    Object.assign(userToUpdate, propsForUser);
    return true;
  }
}
