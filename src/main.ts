import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port
      }
    }
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,              // valida en conjunto con class-validator
      forbidNonWhitelisted: true,   // properties tienen que venir como yo digo
    })
  )

  //await app.listen(envs.port ?? 3000);
  await app.listen();         //definido en el microservice
  
  // await app.startAllMicroservices()          -> hibrid option of microservices

  console.log(`Products Microservice running on port`, envs.port )


}
bootstrap();
