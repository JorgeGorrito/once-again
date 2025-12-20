interface ILoader<T> {
    load: () => Promise<T>;
}

export { ILoader };

