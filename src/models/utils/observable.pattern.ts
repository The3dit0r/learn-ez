export class Observable<T> {
  private value: T | undefined;

  constructor(initialValue?: T) {
    this.value = initialValue;
  }
  private subscribers: Observer<T>[] = [];

  public subscribe(fn: (value: T) => void, id: string = crypto.randomUUID()) {
    this.subscribers.push({
      fn,
      id,
    });
    return id;
  }

  public set(value: T) {
    this.value = value;
    for (const subscriber of this.subscribers) {
      subscriber.fn(value);
    }
  }

  public unsubscribe(id: string) {
    this.subscribers.filter((val) => {
      return val.id != id;
    });
  }

  public get(): T | undefined {
    return this.value;
  }
}

export type Observer<T> = { fn: (value: T) => void; id: string };
