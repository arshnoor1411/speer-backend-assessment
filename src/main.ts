import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: ['http://localhost:3000'] });
  await app.listen(4000, '0.0.0.0');

  const config = new DocumentBuilder()
    .setTitle('Speer Backend')
    .setDescription('Speer Backend APIs')
    .setVersion('1.0')
    .addTag('speer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
