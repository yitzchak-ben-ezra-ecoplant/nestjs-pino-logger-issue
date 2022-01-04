# nestjs-pino-logger-issue
bug in TRANSIENT instantiation of Pino Logger

when usin Scope.TRANSIENT it is expected to receive new instance on every injection.
PinoLogger is marked as TRANSIENT and MyLogger which wraps it - also marked as TRANSIENT.
when using latest nestjs and latest nestjs-pino this scenario throws an error:

```
[Nest] 28796  - 04/01/2022, 9:06:39   ERROR [ExceptionHandler]                                           
Error                                                                                                    
    at Injector.loadInstance (C:\gitWorkspace\Packages\TEST\node_modules\@nestjs\core\injector\injector.js:41:19)
    at Injector.loadProvider (C:\gitWorkspace\Packages\TEST\node_modules\@nestjs\core\injector\injector.js:74:20)
    at Injector.resolveComponentHost (C:\gitWorkspace\Packages\TEST\node_modules\@nestjs\core\injector\injector.js:164:24)
    at Injector.resolveComponentInstance (C:\gitWorkspace\Packages\TEST\node_modules\@nestjs\core\injector\injector.js:158:21)
    at async resolveParam (C:\gitWorkspace\Packages\TEST\node_modules\@nestjs\core\injector\injector.js:108:38)
    at async Promise.all (index 0)
    at async Injector.resolveConstructorParams (C:\gitWorkspace\Packages\TEST\node_modules\@nestjs\core\injector\injector.js:123:27)
    at async Injector.loadInstance (C:\gitWorkspace\Packages\TEST\node_modules\@nestjs\core\injector\injector.js:52:9)
    at async Injector.loadProvider (C:\gitWorkspace\Packages\TEST\node_modules\@nestjs\core\injector\injector.js:74:9)
    at async Injector.resolveComponentHost (C:\gitWorkspace\Packages\TEST\node_modules\@nestjs\core\injector\injector.js:164:13)
```

if using older nestjs (7), this doesn't throw - but provide same PinoLogger instance every time. but new MyLogger on any injection.

workaround: `useFactory` that copies pinoLogger before creating MyLogger
