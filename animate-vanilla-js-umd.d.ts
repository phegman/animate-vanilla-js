import CancelablePromise from './CancelablePromise';
import EasingFunction from './interfaces/easing/easing-function.interface';
export default function animate(from: number, to: number, duration: number, easing: string | EasingFunction, update: (value: number) => void): CancelablePromise<string>;
