import "./font.scss";
import "./style.scss";
import "./elementsFromPointPolyfill.js";
import { Warehouse } from "./warehouse";
import React, { useEffect, useRef, useState } from "react";
import { StorageCabinet } from "./storageCabinet";
import { CallbackProps, Context } from "./context";
import { isMobile } from "./isMobile";
import { ConfigProps } from "./unit";

import { ConfigYML } from "@possie-engine/dr-plugin-sdk/config/yml";
import { PluginComms } from "@possie-engine/dr-plugin-sdk/pluginComms";

export const comms = new PluginComms({
    defaultConfig: new ConfigYML(),
});

const Main: React.FC = () => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const [mobileStatus, setMobileStatus] = useState(isMobile);

    const callback = useRef<CallbackProps>({
        up: [],
    });

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

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
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className="wrapper">
            <div className="question">
                <div
                    className="questionContent"
                    dangerouslySetInnerHTML={{
                        __html: (comms as unknown as ConfigProps).config.question ?? "",
                    }}
                />
                <div
                    className="questionDes"
                    dangerouslySetInnerHTML={{
                        __html: `(${(comms as unknown as ConfigProps).config.instruction ?? ""})`,
                    }}
                />
            </div>
            <Context.Provider
                value={{
                    callback,
                    isMobile: mobileStatus,
                }}
            >
                <Warehouse />
                <div className="hr" />
                <StorageCabinet />
            </Context.Provider>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

void comms.renderOnReady(<Main />);
