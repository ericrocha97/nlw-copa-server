import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";

import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";
import { guessRoutes } from "./routes/guess";
import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  });

  await fastify.register(cors, {
    origin: true,
  });

  let secret;
  if (process.env.JWT_SECRET) {
    secret = process.env.JWT_SECRET;
  } else {
    throw new Error(
      "The environment variable JWT_SECRET needs to be defined in .env"
    );
  }

  await fastify.register(jwt, {
    secret,
  });

  await fastify.register(authRoutes);
  await fastify.register(gameRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(poolRoutes);
  await fastify.register(userRoutes);

  await fastify.listen({ port: 3333 /*host: "0.0.0.0" */ });
}

bootstrap();
