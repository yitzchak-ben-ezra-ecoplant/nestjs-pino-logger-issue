import { Module, Scope } from "@nestjs/common";
import { MyLogger } from "./my-logger";
import { LoggerModule as PinoLoggerModule } from "nestjs-pino";
import { TestService, TestService2 } from "./test.service";

@Module({
  imports: [
    PinoLoggerModule.forRoot(),
  ],
  providers: [
    {
      provide: MyLogger,
      useClass: MyLogger,
      scope: Scope.TRANSIENT, // <-- TODO: this causes the issue, change to Default works but gives a singleton
    },
    TestService,
    TestService2,
  ],
})
export class AppModule {}
