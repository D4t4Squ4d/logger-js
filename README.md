# logger-js

Logger for applications created with JavaScript/Typescript

## Usage

```js
import { GlobalLogger, LoggerFactory } from './logger';
import { LogLevel } from './types';

const MyLogger = LoggerFactory.get('MyLogger'); // Default LogLevel : DEBUG
const MyLogger2 = LoggerFactory.get('MyLoggerInfo', LogLevel.INFO);
const MyLogger3 = LoggerFactory.get('MyLoggerOff', LogLevel.OFF); // Log nothing

GlobalLogger.debug('yes', 'amazing');
GlobalLogger.info('text', 1, { type: 'object' });
MyLogger.warn('easy no ?');
MyLogger2.error('an error !');
MyLogger2.log('ez');
MyLogger3.log('vanish...');

MyLogger.setLevel(LogLevel.ERROR);
MyLogger.debug('useless')
```

==>

```js
[DEBUG][Global      ] 1970-00-00 00:00:00.123 > yes amazing
[INFO ][Global      ] 1970-00-00 00:00:00.124 > text 1 { type: 'object' }
[WARN ][MyLogger    ] 1970-00-00 00:00:00.125 > easy no ?
[ERROR][MyLoggerInfo] 1970-00-00 00:00:00.127 > an error !
[LOG  ][MyLoggerInfo] 1970-00-00 00:00:00.127 > ez
```
