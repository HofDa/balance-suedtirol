import assert from "node:assert/strict";
import test from "node:test";
import { animateNumber } from "../src/lib/animate-number";

test("numeric animation finishes exactly and can be interrupted before or during playback", (context) => {
  let nextId = 0;
  const timers = new Map<number, () => void>();
  const frames = new Map<number, FrameRequestCallback>();
  context.mock.method(globalThis, "setTimeout", (callback: () => void) => {
    timers.set(++nextId, callback);
    return nextId;
  });
  context.mock.method(globalThis, "clearTimeout", (id: number) => timers.delete(id));
  const previous = Object.getOwnPropertyDescriptors(globalThis);
  Object.assign(globalThis, {
    window: globalThis,
    requestAnimationFrame: (callback: FrameRequestCallback) => {
      frames.set(++nextId, callback);
      return nextId;
    },
    cancelAnimationFrame: (id: number) => frames.delete(id)
  });
  context.after(() => {
    for (const key of ["window", "requestAnimationFrame", "cancelAnimationFrame"]) {
      if (previous[key]) Object.defineProperty(globalThis, key, previous[key]);
      else Reflect.deleteProperty(globalThis, key);
    }
  });
  context.mock.method(performance, "now", () => 0);
  const flushTimers = () => {
    const callbacks = [...timers.values()];
    timers.clear();
    callbacks.forEach((callback) => callback());
  };
  const tick = (time: number) => {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach((callback) => callback(time));
  };
  const values: number[] = [];
  const options = { from: 100, to: 50, duration: 1400, delay: 300, onUpdate: (value: number) => values.push(value) };

  animateNumber(options)();
  flushTimers();
  tick(700);
  assert.deepEqual(values, [], "a visitor can interrupt the initial delay");

  const stop = animateNumber(options);
  flushTimers();
  tick(700);
  assert.ok(values[0] > 50 && values[0] < 100);
  stop();
  tick(1400);
  assert.equal(values.length, 1, "manual input must not be overwritten by a later animation frame");

  animateNumber(options);
  flushTimers();
  tick(1500);
  assert.equal(values.at(-1), 50);
  assert.equal(frames.size, 0, "finished animations schedule no more work");
});
