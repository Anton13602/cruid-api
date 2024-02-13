import { createServer } from 'node:http';
import { defaultPort, defaultRout } from './constants';
import { RestMethod } from './types/types';
import { addUser, deleteUser, getAllUsers, getUserById, updateUser } from './userController/userController';

const PORT = process.env.NODE_TEST ? 5000 : (process.env.PORT || defaultPort);

export const startServer = async () => {
  const server = createServer((request, response) => {
    try {
      const { url, method } = request;
      const propsUrl = request.url?.split('/')[3] ?? '';
      let data: string = '';

      if (url?.slice(0, defaultRout.length) !== defaultRout) {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({
          message: `${url} - not found.`,
        }));
      }

      request.on('data', (chunk) => {
        data += chunk.toString();
      }).on('end', async () => {
        let status: number = 500;
        let header: string = '';
        let body: string = '';

        if (method === RestMethod.POST && data.length) {
          ({ status, header, body } = await addUser(data));
        }

        if (method === RestMethod.GET && propsUrl.length) {
          ({ status, header, body } = await getUserById(propsUrl));
        }

        if (method === RestMethod.GET && !propsUrl.length) {
          ({ status, header, body } = await getAllUsers());
        }

        if (method === RestMethod.PUT && data.length && propsUrl.length) {
          const props = {
            id: propsUrl,
            data: data,
          };

          ({ status, header, body } = await updateUser(props));
        }

        if (method === RestMethod.DELETE && propsUrl.length) {
          ({ status, header, body } = await deleteUser(propsUrl));
        }

        response.writeHead(status, header);
        response.end(body);
      });
    } catch (e) {
      response.writeHead(500, 'Server error');
      response.end(JSON.stringify({
        message: 'Server error.',
      }));
    }
  });

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
};

startServer();
