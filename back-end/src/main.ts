import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();  // Enables CORS

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Violator Management API')
    .setDescription('API documentation for managing violators')
    .setVersion('1.0')
    .addTag('Violator')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Set up Swagger UI at /api
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log('Application is running on http://localhost:3000');
  console.log('Swagger UI is available at http://localhost:3000/api');

}
bootstrap();
