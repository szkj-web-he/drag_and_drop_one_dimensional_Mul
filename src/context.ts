import { createContext, useContext } from "react";

export interface HandleUpFnProps {
    x: number;
    y: number;
    code: string;
    content: string;
}
export type HandleUpFn = (res: HandleUpFnProps) => void;

export type HandleMoveFn = (x: number, y: number) => void;

export interface CallbackProps {
    up: Array<HandleUpFn>;
    move?: HandleMoveFn;
}

interface ContextDataProps {
    isMobile: boolean;

    callback: React.MutableRefObject<CallbackProps>;
}

const contextData = (): ContextDataProps => ({
    isMobile: false,

    callback: {
        current: {
            up: [],
        },
    },
});

export const Context = createContext(contextData());

export const useMContext = (): ContextDataProps => useContext(Context);
