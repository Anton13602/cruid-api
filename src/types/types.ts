export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export enum RestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}
