export class Observable {
  constructor(value) {
    this.value = value;
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    listener(this.value);
  }

  set(value) {
    this.value = value;
    this.listeners.forEach((fn) => fn(this.value));
  }

  get() {
    return this.value;
  }
}
