export class Task {
  id: number;
  title: string;
  complete: boolean;

  constructor(title: string, complete: boolean) {
    this.title = title;
    this.complete = complete;
  }
}
