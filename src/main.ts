import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 4996
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("To - Do")
    .setDescription("APIs for todo project")
    .build()
    
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(PORT);
    console.log(`server is start on ${PORT}`)
}
bootstrap();
