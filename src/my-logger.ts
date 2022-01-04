import { PinoLogger } from "nestjs-pino";
import { Injectable, LoggerService } from "@nestjs/common";

@Injectable()
export class MyLogger implements LoggerService {
  constructor(private readonly logger: PinoLogger) {}

  setContext(context: string): void {
    this.logger.setContext(context);
  }

  debug(msg: any): any {
    this.logger.debug({ msg });
  }

  error(msg: any, trace?: string): any {
    if (msg.message && msg.stack) {
      trace = msg.stack;
      msg = msg.message;
    }
    this.logger.error({ msg, trace });
  }

  log(msg: any): any {
    this.logger.info({ msg });
  }

  verbose(msg: any): any {
    this.logger.trace({ msg });
  }

  warn(msg: any): any {
    this.logger.warn({ msg });
  }
}
