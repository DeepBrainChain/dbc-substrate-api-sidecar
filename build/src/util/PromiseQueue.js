"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _PromiseQueue_maxTasks, _PromiseQueue_runningTasks, _PromiseQueue_tasks, _LinkedList_first, _LinkedList_last;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromiseQueue = void 0;
/**
 * A PromiseQueue, enforcing that no more than `maxTasks` number of tasks
 * are running at a given time.
 */
class PromiseQueue {
    constructor(maxTasks) {
        // How many tasks are allowed to run concurrently?
        _PromiseQueue_maxTasks.set(this, void 0);
        // How many tasks are currently running concurrently?
        _PromiseQueue_runningTasks.set(this, 0);
        // The queued tasks waiting to run
        _PromiseQueue_tasks.set(this, void 0);
        __classPrivateFieldSet(this, _PromiseQueue_maxTasks, maxTasks, "f");
        __classPrivateFieldSet(this, _PromiseQueue_tasks, new LinkedList(), "f");
    }
    // Try to run the next task in the queue.
    tryRunNextTask() {
        if (__classPrivateFieldGet(this, _PromiseQueue_runningTasks, "f") >= __classPrivateFieldGet(this, _PromiseQueue_maxTasks, "f")) {
            return;
        }
        const nextTask = __classPrivateFieldGet(this, _PromiseQueue_tasks, "f").popFront();
        if (nextTask) {
            nextTask();
            __classPrivateFieldSet(this, _PromiseQueue_runningTasks, __classPrivateFieldGet(this, _PromiseQueue_runningTasks, "f") + 1, "f");
        }
    }
    // Take a task and package it up to run, triggering
    // the next task when it completes (or errors), and returning the
    // result in the returned promise.
    submitTaskToRun(task) {
        return new Promise((resolve, reject) => {
            const onFinish = () => {
                __classPrivateFieldSet(this, _PromiseQueue_runningTasks, __classPrivateFieldGet(this, _PromiseQueue_runningTasks, "f") - 1, "f");
                this.tryRunNextTask();
            };
            const taskToRun = () => {
                task()
                    .then((item) => {
                    resolve(item);
                    onFinish();
                })
                    .catch((err) => {
                    reject(err);
                    onFinish();
                });
            };
            __classPrivateFieldGet(this, _PromiseQueue_tasks, "f").pushBack(taskToRun);
            this.tryRunNextTask();
        });
    }
    /**
     * Push a new task onto the queue. It will run when there are fewer
     * than `maxTasks` running.
     */
    run(task) {
        return this.submitTaskToRun(task);
    }
}
exports.PromiseQueue = PromiseQueue;
_PromiseQueue_maxTasks = new WeakMap(), _PromiseQueue_runningTasks = new WeakMap(), _PromiseQueue_tasks = new WeakMap();
/**
 * A quick LinkedList queue implementation; we can add items to the back
 * or remove them from the front.
 */
class LinkedList {
    constructor() {
        _LinkedList_first.set(this, null);
        _LinkedList_last.set(this, null);
    }
    init(item) {
        __classPrivateFieldSet(this, _LinkedList_first, __classPrivateFieldSet(this, _LinkedList_last, { item, next: null }, "f"), "f");
    }
    pushBack(item) {
        if (!__classPrivateFieldGet(this, _LinkedList_first, "f"))
            return this.init(item);
        const entry = { item, next: null };
        /* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
        __classPrivateFieldGet(this, _LinkedList_last, "f").next = entry;
        __classPrivateFieldSet(this, _LinkedList_last, entry, "f");
    }
    popFront() {
        if (!__classPrivateFieldGet(this, _LinkedList_first, "f"))
            return null;
        const entry = __classPrivateFieldGet(this, _LinkedList_first, "f");
        __classPrivateFieldSet(this, _LinkedList_first, __classPrivateFieldGet(this, _LinkedList_first, "f").next, "f");
        return entry.item;
    }
    clear() {
        __classPrivateFieldSet(this, _LinkedList_first, __classPrivateFieldSet(this, _LinkedList_last, null, "f"), "f");
    }
    empty() {
        return __classPrivateFieldGet(this, _LinkedList_first, "f") === null;
    }
}
_LinkedList_first = new WeakMap(), _LinkedList_last = new WeakMap();
//# sourceMappingURL=PromiseQueue.js.map