import { INestApplicationContext } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { BootstrapAdminService } from '@users/services';
import { AppModule } from '../app.module';
import { loadBootstrapAdminCredentials } from './bootstrap-admin.config';

dotenv.config();

async function bootstrap() {
  let app: INestApplicationContext | undefined;

  try {
    const credentials = loadBootstrapAdminCredentials();
    app = await NestFactory.createApplicationContext(AppModule);
    const bootstrapAdminService = app.get(BootstrapAdminService);

    const admin = await bootstrapAdminService.bootstrapAdmin(
      credentials.email,
      credentials.password,
    );

    console.log(`Created ADMIN user ${admin.email} (${admin.id})`);
  } catch (error) {
    process.exitCode = 1;
    if (error instanceof Error) {
      console.error(error.message);
      return;
    }
    console.error(error);
  } finally {
    await app?.close();
  }
}

void bootstrap();
