export type ActionSuccess<T> = {
    error: null;
    data: T;
};

export type ActionError = {
    error: string;
    data: null;
};

export type ActionResponse<T> = Promise<ActionSuccess<T> | ActionError>; 