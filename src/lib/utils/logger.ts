// Simple logging utility with different log levels

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

class Logger {
  private isDevelopment = process.env.NODE_ENV !== 'production';

  private formatMessage(level: LogLevel, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const metaString = meta ? `\n${JSON.stringify(meta, null, 2)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaString}`;
  }

  debug(message: string, meta?: any): void {
    if (this.isDevelopment) {
      console.log(this.formatMessage(LogLevel.DEBUG, message, meta));
    }
  }

  info(message: string, meta?: any): void {
    console.log(this.formatMessage(LogLevel.INFO, message, meta));
  }

  warn(message: string, meta?: any): void {
    console.warn(this.formatMessage(LogLevel.WARN, message, meta));
  }

  error(message: string, error?: Error | any, meta?: any): void {
    const errorDetails = error instanceof Error 
      ? { name: error.name, message: error.message, stack: error.stack }
      : error;
    
    console.error(this.formatMessage(LogLevel.ERROR, message, {
      error: errorDetails,
      ...meta,
    }));
  }

  // API request logging
  logRequest(method: string, path: string, meta?: any): void {
    this.info(`API Request: ${method} ${path}`, meta);
  }

  // API response logging
  logResponse(method: string, path: string, statusCode: number, duration?: number): void {
    const message = `API Response: ${method} ${path} - ${statusCode}`;
    const meta = duration ? { duration: `${duration}ms` } : undefined;
    
    if (statusCode >= 500) {
      this.error(message, undefined, meta);
    } else if (statusCode >= 400) {
      this.warn(message, meta);
    } else {
      this.info(message, meta);
    }
  }
}

export const logger = new Logger();
