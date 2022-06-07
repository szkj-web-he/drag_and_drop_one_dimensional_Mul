import { createContext, useContext } from "react";
import { OptionProps } from "./unit";

export interface ValueChangeFnProps {
    x: number;
    y: number;
    data: OptionProps;
}

interface ContextDataProps {
    isMobile: boolean;
    moveCallBack: React.MutableRefObject<(x: number, y: number) => void>;
    upCallBack: React.MutableRefObject<() => void>;
    valueChangeCallback: (res: ValueChangeFnProps) => void;
}
const contextData = (): ContextDataProps => ({
    isMobile: false,
    moveCallBack: { current: () => undefined },
    upCallBack: { current: () => undefined },
    valueChangeCallback: () => undefined,
});

export const Context = createContext(contextData());

export const useMContext = (): ContextDataProps => useContext(Context);
