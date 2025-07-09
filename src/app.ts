import Fastify from 'fastify';
import { authRoutes } from './routes/auth.route';

export async function createApp() {
  const app = Fastify({
    logger: {
      level: 'info',
    },
  });

  // Global error handler
  app.setErrorHandler(async (error, request, reply) => {
    console.error('Global error handler:', error);
    
    if (error.validation) {
      return reply.status(400).send({
        error: 'Validation failed',
        details: error.validation,
      });
    }
    
    return reply.status(500).send({
      error: 'Internal Server Error',
    });
  });

  // Health check endpoint
  app.get('/api/health', async (request, reply) => {
    return { status: 'OK', message: 'Joylo Backend is running' };
  });

  // Register routes
  await app.register(authRoutes);

  return app;
}