import "./font.scss";
import "./style.scss";
import "./elementsFromPointPolyfill.ts";
import { Warehouse } from "./warehouse";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StorageCabinet } from "./storageCabinet";
import { Context, ValueChangeFnProps } from "./context";
import { isMobile } from "./isMobile";

import { PluginComms, ConfigYML } from "@possie-engine/dr-plugin-sdk";
import { hasStorageEl, OptionProps } from "./unit";
import leftHr from "./Assets/svg/leftHr.svg";
import rightHr from "./Assets/svg/rightHr.svg";

export const comms = new PluginComms({
    defaultConfig: new ConfigYML(),
}) as {
    config: {
        question?: string;
        instruction?: string;
        options?: Array<{ code: string; content: string }>;
    };
    state: unknown;
    renderOnReady: (res: React.ReactNode) => void;
};

const Main: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [mobileStatus, setMobileStatus] = useState(isMobile);

    const moveCallBack = useRef<(x: number, y: number) => void>(() => undefined);
    const upCallBack = useRef<() => void>(() => undefined);

    const selectedValuesRef = useRef<Array<OptionProps>>();
    const [selectedValues, setSelectedValues] = useState(
        selectedValuesRef.current ? [...selectedValuesRef.current] : undefined,
    );

    const noSelectedValues = useMemo(() => {
        const arr = comms.config.options ?? [];

        const values = selectedValues ?? [];
        const data: Record<string, string> = {};
        for (let i = 0; i < values.length; i++) {
            const item = values[i];
            data[item.code] = item.content;
        }
        return arr.filter((item) => !data[item.code]);
    }, [selectedValues]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const arr = selectedValues ?? [];

        const options = comms.config.options ?? [];
        const state: Record<string, 0 | 1> = {};
        for (let i = 0; i < options.length; i++) {
            const val = arr.some((item) => item.code === options[i].code);
            state[options[i].code] = Number(val) as 0 | 1;
        }
        comms.state = state;
    }, [selectedValues]);

    useEffect(() => {
        const fn = () => {
            setMobileStatus(isMobile);
        };
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
        };
    }, []);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const valueChangeCallback = useCallback((res: ValueChangeFnProps) => {
        const status = hasStorageEl(res.x, res.y);

        if (!selectedValuesRef.current && status) {
            selectedValuesRef.current = [
                {
                    code: res.data.code,
                    content: res.data.content,
                },
            ];
            setSelectedValues([...selectedValuesRef.current]);
            return;
        }
        const arr = selectedValuesRef.current ?? [];

        let n = -1;
        for (let i = 0; i < arr.length; ) {
            const item = arr[i];
            if (item.code === res.data.code) {
                n = i;
                i = arr.length;
            } else {
                ++i;
            }
        }

        //要添加data
        if (status) {
            //不存在
            if (n < 0) {
                arr.push({
                    code: res.data.code,
                    content: res.data.content,
                });
            }
        } //要删除data
        else if (n >= 0) {
            arr.splice(n, 1);
        }

        selectedValuesRef.current = [...arr];
        setSelectedValues([...selectedValuesRef.current]);
    }, []);

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <div className="wrapper">
            <div className="question">
                <div
                    className="questionContent"
                    dangerouslySetInnerHTML={{
                        __html: comms.config.question ?? "",
                    }}
                />
                <div
                    className="questionDes"
                    dangerouslySetInnerHTML={{
                        __html: `(${comms.config.instruction ?? ""})`,
                    }}
                />
            </div>
            <Context.Provider
                value={{
                    valueChangeCallback,
                    moveCallBack,
                    isMobile: mobileStatus,
                    upCallBack,
                }}
            >
                <Warehouse list={[...noSelectedValues]} />
                <div className="hr">
                    <div
                        className="hr_left"
                        dangerouslySetInnerHTML={{
                            __html: leftHr,
                        }}
                    />
                    <div
                        className="hr_right"
                        dangerouslySetInnerHTML={{
                            __html: rightHr,
                        }}
                    />
                </div>
                <StorageCabinet list={selectedValues ? [...selectedValues] : []} />
            </Context.Provider>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
