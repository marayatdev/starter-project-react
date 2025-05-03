import chalk from "chalk";

enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}

const getTimestamp = () => new Date().toISOString();

const log = (level: LogLevel, message: string, context?: string) => {
  const timestamp = getTimestamp();
  let formattedMessage = `[${timestamp}] [${level}]`;

  if (context) {
    formattedMessage += ` [${context}]`;
  }

  formattedMessage += `: ${message}`;

  switch (level) {
    case LogLevel.INFO:
      console.log(chalk.blue(formattedMessage));
      break;
    case LogLevel.WARN:
      console.warn(chalk.yellow(formattedMessage));
      break;
    case LogLevel.ERROR:
      console.error(chalk.red(formattedMessage));
      break;
    case LogLevel.DEBUG:
      console.debug(chalk.gray(formattedMessage));
      break;
  }
};

export const logger = {
  info: (msg: string, ctx?: string) => log(LogLevel.INFO, msg, ctx),
  warn: (msg: string, ctx?: string) => log(LogLevel.WARN, msg, ctx),
  error: (msg: string, ctx?: string) => log(LogLevel.ERROR, msg, ctx),
  debug: (msg: string, ctx?: string) => log(LogLevel.DEBUG, msg, ctx),
};
