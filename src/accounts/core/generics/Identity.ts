import { randomUUID } from 'node:crypto';

export class Identity {
  private readonly value: string;

  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  get id(): string {
    return this.value;
  }
}
