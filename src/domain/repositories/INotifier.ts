export interface INotifier <T> {
    notify(content : T): Promise<void>;
}