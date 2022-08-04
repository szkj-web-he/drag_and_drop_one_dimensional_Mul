/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useLayoutEffect, useState } from "react";
import { useMContext } from "./context";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

import { hasStorageEl } from "./unit";
import { Product } from "./product";
import { ScrollComponent } from "./Scroll";
import { WarehouseProps } from "./warehouse";

import lt from "./Assets/img/icon_lt.png";
import rb from "./Assets/img/icon_rb.png";
import { comms } from "./index";
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const StorageCabinet: React.FC<WarehouseProps> = ({ list }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { isMobile, moveCallBack, upCallBack } = useMContext();

    const [active, setActive] = useState(false);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useLayoutEffect(() => {
        let timer: number | null = null;
        moveCallBack.current = (x: number, y: number) => {
            timer && window.clearTimeout(timer);

            timer = window.setTimeout(() => {
                setActive(hasStorageEl(x, y));
            }, 1);
        };
        upCallBack.current = () => {
            timer && window.clearTimeout(timer);
            setActive(false);
        };
        return () => {
            timer && window.clearTimeout(timer);
        };
    }, [moveCallBack, upCallBack]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    const content = (
        <div className="storageCabinet_main">
            <div className="placeholder" style={list?.length ? { display: "none" } : {}}>
                {comms.config.optionsInstruction}
            </div>
            <Product list={list ?? []} />
        </div>
    );

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="storageCabinet_wrap">
            <img alt="" src={lt} className="storageCabinet_ltIcon" />
            <img alt="" src={rb} className="storageCabinet_rbIcon" />

            <div
                className={`storageCabinet_container${isMobile ? " scrollBody" : ""}${
                    active ? " storageCabinet_container__active" : ""
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
