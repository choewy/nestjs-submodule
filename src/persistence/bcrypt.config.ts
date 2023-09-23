export class BcryptConfig {
  private readonly SALT_OR_ROUNDS = 10;

  public getSaltOrRounds(): number {
    return this.SALT_OR_ROUNDS;
  }
}
