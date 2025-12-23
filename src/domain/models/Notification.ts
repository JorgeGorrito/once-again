export interface Notification<T> { 
    payload : T;
    secondsFromNow: number;
}