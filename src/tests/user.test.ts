import { defaultPort } from '../constants';
import { isUuid } from '../utils/isUuid';
import dotenv from 'dotenv';

dotenv.config();
//Tests run when the server is running

const mockData = {
  username: "Roma",
  age: 30,
  hobbies: ['Football']
}

const mockUpdateData = {
  hobbies: ['Football', 'Basketball']
}

const PORT = process.env.PORT || defaultPort;
const BASE_URL = `http://localhost:${PORT}/api/users`;
const BAD_BASE_URL = `http://localhost:${PORT}/sdsad/ffff/23ed`;
describe('Users tests', () => {
  let userId: string = '';

  test('should get empty arr', async () => {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual([]);
  });

  test('should create new user', async () => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockData),
    });

    const createdUser = await response.json();
    userId = createdUser.id; // Сохраняем userId для последующих тестов

    expect(response.status).toBe(201);
    expect(createdUser).toMatchObject(mockData);
  });

  test('should return the user if there is an ID', async () => {
    const response = await fetch(`${BASE_URL}/${userId}`);
    const user = await response.json();

    expect(response.status).toBe(200);
    expect(user.id).toBe(userId);
  });

  test('should update the user fields', async () => {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mockUpdateData),
    });

    const updatedUser = await response.json();
    const cloneMockData = Object.assign({}, mockData)
    Object.assign(cloneMockData, { ...mockUpdateData, id: userId })

    expect(response.status).toBe(200);
    expect(updatedUser).toMatchObject(cloneMockData);
    expect(updatedUser.id).toBe(userId);
  });

  test('should delete the created entry', async () => {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: 'DELETE',
    });

    expect(response.status).toBe(204);
  });

  test('should return 404 after delete', async () => {
    const response = await fetch(`${BASE_URL}/${userId}`);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.message).toBe(`User with this ID: ${userId} was not found.`);
  });
});

describe('UUID', () => {
  test('should send 400 if is not valid uuid', async () => {
    const invalidUserId = 'invalidId';

    const response = await fetch(`${BASE_URL}/${invalidUserId}`);
    const responseData = await response.json();

    expect(response.status).toBe(400);
    expect(responseData.message).toBe(`${invalidUserId} is not valid`);
  });

  test('should return true', async () => {
    const validUuid = '550e8400-e29b-41d4-a716-446655440000';
    expect(isUuid(validUuid)).toBe(true);
  });

  test('should return false', async () => {
    const isNotValidUuid = 'aff-16-446655440000';
    expect(isUuid(isNotValidUuid)).toBe(false);
  });
});

describe('Checking requests to endpoints.', () => {
  test('should return 200', async () => {
    const response = await fetch(`${BASE_URL}`);
    expect(response.status).toBe(200);
  });
  test('should return 404', async () => {
    const response = await fetch(`${BAD_BASE_URL}`);
    expect(response.status).toBe(404);
  });
});
