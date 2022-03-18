import { Application } from 'https://deno.land/x/oak@v10.4.0/mod.ts';

import router from './routes.ts';

const HOST = '127.0.0.1';
const PORT = 3000;

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${PORT} ...`);
await app.listen(`${HOST}:${PORT}`);
