import Fastify from "fastify";

const app = Fastify();

app.register(require('@fastify/cors'), () => {
  return (req: { headers: { origin: string; }; }, callback: (arg0: null, arg1: {
      origin: boolean;
    }) => void) => {
    const corsOptions = {
      origin: true
    };

    if (/^localhost$/m.test(req.headers.origin)) {
      corsOptions.origin = false
    }

    callback(null, corsOptions)
  }
})

export { app };
