import { config } from 'dotenv';
import { join } from 'path';

config({
  path: join(__dirname, '..', '..', '.env'),
});
export class Config {
  constructor() {
    throw new Error('This is an only static class.');
  }
  static readonly port: number = this.parseInt(this.getFromEnv('PORT'));
  static readonly nodeEnv: string = this.parseString(
    this.getFromEnv('NODE_ENV'),
  );
  static readonly corsWhitelist: string[] = this.parseArrayOfString(
    this.getFromEnv('WHITELIST_DOMAINS'),
  );
  static readonly dbName = this.parseString(this.getFromEnv('DB_NAME'));
  static readonly dbPort = this.parseInt(this.getFromEnv('DB_PORT'));
  static readonly dbHost = this.parseString(this.getFromEnv('DB_HOST'));
  static readonly dbUsername = this.parseString(this.getFromEnv('DB_USERNAME'));
  static readonly dbPassword = this.parseString(this.getFromEnv('DB_PASSWORD'));
  static readonly dbSync = this.parseBoolean(this.getFromEnv('DB_SYNCHRONIZE'));
  static readonly jwtSecret = this.parseString(this.getFromEnv('JWT_SECRET'));
  static readonly saltSecret = this.parseString(this.getFromEnv('SALT_SECRET'));

  private static getFromEnv(key: string) {
    console.log('key', key);
    console.log('key', key);
    return process.env[key];
  }
  private static parseInt(value: string | undefined): number {
    if (!value) {
      throw new Error(`${value} is missing in Config. type: number`);
    }
    const parsedValue = parseInt(value);
    if (isNaN(parsedValue)) {
      throw new Error('This config is not of correct type');
    }
    return parsedValue;
  }

  private static parseString(value: string | undefined): string {
    if (!value) {
      throw new Error(`${value} is missing in Config. type: string`);
    }
    return value;
  }

  private static parseBoolean(value: string | undefined): boolean {
    if (!value) {
      throw new Error(`Boolean value is missing in Config.`);
    }

    if (!(value === 'true' || value === 'false')) {
      throw new Error(`Boolean valve is invalid.`);
    }

    return value === 'true' ? true : false;
  }

  private static parseArrayOfString(value: string | undefined) {
    if (!value) {
      throw new Error(`Missing Env value in Conig type: arrayOfString.`);
    }
    return value.split(',');
  }
}
