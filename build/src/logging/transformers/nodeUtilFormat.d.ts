import * as winston from 'winston';
/**
 * Console.log style formatting using node's `util.format`. We need this so we
 * can override console.{log, error, etc.} without issue.
 */
export declare const nodeUtilFormat: winston.Logform.FormatWrap;
