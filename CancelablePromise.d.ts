import Reject from './interfaces/promise/reject.interface';
import Cancel from './interfaces/promise/cancel.interface';
import Resolve from './interfaces/promise/resolve.interface';
export default class CancelablePromise<T> {
    private cancelHandler;
    private isPending;
    private promise;
    isCanceled: boolean;
    constructor(callback: {
        (resolve: Resolve<T>, reject: Reject, onCancel: Cancel): void;
        (arg0: (value: any) => void, arg1: (error: any) => void, arg2: (handler: any) => void): void;
    });
    then<TResult1 = T, TResult2 = never>(onFulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onRejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    catch<TResult = never>(onRejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    cancel(reason?: any): void;
}
