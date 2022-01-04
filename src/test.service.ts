import { MyLogger } from "./my-logger";
import { Injectable } from "@nestjs/common";

function sayHello(logger: MyLogger, serviceName: string) {
  this.logger.setContext(serviceName);
  logger.log(`Hello from ${serviceName}`);
  new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
    logger.log(`SECOND Hello from ${serviceName}`)
  );
}

@Injectable()
export class TestService {
  constructor(private readonly logger: MyLogger) {
    sayHello(logger, TestService.name);
  }
}

@Injectable()
export class TestService2 {
  constructor(private readonly logger: MyLogger) {
    sayHello(logger, TestService2.name);
  }
}
