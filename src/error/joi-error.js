export class JoiError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
