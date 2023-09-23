import { JwtModuleOptions, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

export class JwtConfig {
  private readonly SECRET: string;
  private readonly SUBJECT: string;
  private readonly ISSUER: string;
  private readonly AUDIENCE: string;
  private readonly EXPIRES_IN: string;

  constructor(prefix: string) {
    this.SECRET = process.env[[prefix, 'SECRET'].join('_')];
    this.SUBJECT = process.env[[prefix, 'SUBJECT'].join('_')];
    this.ISSUER = process.env[[prefix, 'ISSUER'].join('_')];
    this.AUDIENCE = process.env[[prefix, 'AUDIENCE'].join('_')];
    this.EXPIRES_IN = process.env[[prefix, 'EXPIRES_IN'].join('_')];
  }

  public getSecretOption(): string {
    return this.SECRET;
  }

  public getSignOptions(): JwtSignOptions {
    return {
      secret: this.SECRET,
      subject: this.SUBJECT,
      issuer: this.ISSUER,
      audience: this.AUDIENCE,
      expiresIn: this.EXPIRES_IN,
    };
  }

  public getVerifyOptions(): JwtVerifyOptions {
    return {
      secret: this.SECRET,
      subject: this.SUBJECT,
      issuer: this.ISSUER,
      audience: this.AUDIENCE,
    };
  }

  public getOptions(): JwtModuleOptions {
    return {
      secret: this.SECRET,
      signOptions: {
        subject: this.SUBJECT,
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
        expiresIn: this.EXPIRES_IN,
      },
      verifyOptions: {
        subject: this.SUBJECT,
        issuer: this.ISSUER,
        audience: this.AUDIENCE,
      },
    };
  }
}
