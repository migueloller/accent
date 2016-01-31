import Promise from 'bluebird';

export default class Queue {
  queue = [];
  running = false;
  timer;

  _shift() {
    const next = this.queue.shift();

    if (next) {
      this.running = true;

      this.timer = setTimeout(() => {
        next.resolve(next.func());

        this.running = false;
        this._shift();
      }, next.time);
    }
  }

  /**
   * @param {function} func
   * @param {number} [time]
   */
  add(func, time = 5) {
    return new Promise(resolve => {
      this.queue.push({ func, time, resolve });

      if (this.queue.length === 1 && !this.running) {
        this._shift();
      }
    });
  }

  clear() {
    clearTimeout(this.timer);
    this.queue = [];
    this.running = false;
  }
}
