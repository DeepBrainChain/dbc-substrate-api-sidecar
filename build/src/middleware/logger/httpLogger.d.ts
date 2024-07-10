import e from 'express';
import winston from 'winston';
export declare const httpLoggerCreate: (winstonInstance: winston.Logger) => e.Handler;
