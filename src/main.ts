import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.init();
  const config = new DocumentBuilder()
    .setTitle('Vertical Slices API')
    .setDescription(
      'API documentation for the Vertical Slices demo application',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description:
          'Enter JWT token in the format: Bearer <token>. You can get a token from the signin endpoint.',
      },
      'bearer',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  // Apply the bearer auth requirement globally so Swagger UI sends the Authorization header for all operations by default
  document.security = [{ bearer: [] }];
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  const port = process.env.PORT ?? 3000;
  const logger = new Logger('Bootstrap');
  await app.listen(port);
  logger.log(`Server is running on port ${port}.`);
  logger.log(`Swagger docs at http://localhost:${port}/docs`);
}
void bootstrap();
