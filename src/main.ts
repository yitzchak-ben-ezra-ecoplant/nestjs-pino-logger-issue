import { MyLogger } from "./my-logger";
import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.startAllMicroservices();
  await app.listen(3101);
  (await app.resolve(MyLogger)).log(
    `Application is running on: ${await app.getUrl()}`
  );
}

bootstrap();
