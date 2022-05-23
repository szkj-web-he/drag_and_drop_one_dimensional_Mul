/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { HandleUpFnProps, useMContext } from "./context";
import { comms } from ".";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

import { ConfigProps, hasStorageEl, OptionProps } from "./unit";
import { Product } from "./product";
import { ScrollComponent } from "./Scroll";

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const StorageCabinet: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { isMobile, callback } = useMContext();

    const [list, setList] = useState<Array<OptionProps>>();

    const [active, setActive] = useState(false);

    const timerOut = useRef<number>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const data: Record<string, boolean> = {};
        const listData: Record<string, true> = {};

        const arr = list ?? [];
        for (let i = 0; i < arr.length; i++) {
            listData[arr[i].code] = true;
        }

        const optionsData = (comms as unknown as ConfigProps).config.options;
        for (let i = 0; i < optionsData.length; i++) {
            const item = optionsData[i];
            data[item.code] = listData[item.code];
        }
        comms.state = data;
    }, [list]);

    useEffect(() => {
        return () => {
            timerOut.current && window.clearTimeout(timerOut.current);
        };
    }, []);

    callback.current.move = (x: number, y: number) => {
        timerOut.current && window.clearTimeout(timerOut.current);

        timerOut.current = window.setTimeout(() => {
            setActive(hasStorageEl(x, y));
        }, 1);
    };

    callback.current.up[0] = (res: HandleUpFnProps) => {
        timerOut.current && window.clearTimeout(timerOut.current);

        const arr = list ? [...list] : [];
        const n = arr.findIndex((item) => item.code === res.code);

        const status = hasStorageEl(res.x, res.y);
        if (status && n < 0) {
            arr.push({
                code: res.code,
                content: res.content,
            });
            setList([...arr]);
        } else if (n >= 0 && !status) {
            arr.splice(n, 1);
            setList([...arr]);
        }
        setActive(false);
    };

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const content = (
        <div className="storageCabinet_main">
            <div className="placeholder" style={list?.length ? { display: "none" } : {}}>
                请将答案选项放置在这里
            </div>
            <Product list={list ?? []} />
        </div>
    );

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="storageCabinet_wrap">
            <div
                className={`storageCabinet_container${isMobile ? " scrollBody" : ""}${
                    active ? " active" : ""
                }`}
            >
                {isMobile ? (
                    content
                ) : (
                    <ScrollComponent bodyClassName="scrollBody" hidden={{ x: true }}>
                        {content}
                    </ScrollComponent>
                )}
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
