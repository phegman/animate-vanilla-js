export default interface Resolve<T> {
    (value?: T | PromiseLike<T>): void;
}
