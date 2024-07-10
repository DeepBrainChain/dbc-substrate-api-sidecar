/**
 * A PromiseQueue, enforcing that no more than `maxTasks` number of tasks
 * are running at a given time.
 */
export declare class PromiseQueue<T> {
    #private;
    constructor(maxTasks: number);
    private tryRunNextTask;
    private submitTaskToRun;
    /**
     * Push a new task onto the queue. It will run when there are fewer
     * than `maxTasks` running.
     */
    run(task: () => Promise<T>): Promise<T>;
}
