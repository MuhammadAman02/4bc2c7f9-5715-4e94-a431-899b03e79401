import { createApp } from './app';
import { env } from './config/env';

async function start() {
  try {
    const app = await createApp();
    
    await app.listen({
      port: env.PORT,
      host: '0.0.0.0',
    });
    
    console.log(`🚀 Joylo Backend server running on port ${env.PORT}`);
    console.log(`📋 Health check: http://localhost:${env.PORT}/api/health`);
    console.log(`🔐 Login endpoint: http://localhost:${env.PORT}/api/auth/login`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();