interface IIdentifiedSaver<T> {
    save(id: string, data: T): Promise<void>;
}

interface ISingletonSaver<T> {
    save(data: T): Promise<void>;
}

export { IIdentifiedSaver, ISingletonSaver };

