import { createServer } from 'node:http';
import { defaultPort, defaultRout } from './constants';
import { RestMethod } from './types/types';
import { addUser, getAllUsers, getUserById } from './userController/userController';

const PORT = process.env.NODE_TEST ? 5000 : (process.env.PORT || defaultPort);

export const startServer = async () => {
  const server = createServer((request, response) => {
    const { url, method } = request;
    const propsUrl = request.url?.split('/')[3] ?? '';
    let data: string = '';

    console.log(url);

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

      console.log(propsUrl);


      response.writeHead(status, header);
      response.end(body);
    });
  });
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
};

startServer();