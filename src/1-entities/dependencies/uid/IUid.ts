export interface IUid {
  generate(): string;
  validate(uid: string): boolean;
}
