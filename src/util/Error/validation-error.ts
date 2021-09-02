export default class ValidationError extends Error {
  private readonly code?: string;

  private readonly details?: Record<string, any>;

  public constructor (code: string, message: string, details?: Record<string, any>) {
    super(message);
    this.name = 'ValidationError';
    this.code = code;
    this.details = details;
    Error.captureStackTrace(this, ValidationError);
  }

  public getName (): string {
    return this.name;
  }

  public getMessage (): string | undefined {
    return this.message;
  }

  public getDetails (): Record<string, any> | undefined {
    return this.details;
  }

  public getCode (): string | undefined {
    return this.code;
  }
}
