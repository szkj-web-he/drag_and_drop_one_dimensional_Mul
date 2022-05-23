/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */

import React, { useState } from "react";
import { Product } from "./product";
import { ConfigProps, hasStorageEl } from "./unit";
import { comms } from ".";
import { HandleUpFnProps, useMContext } from "./context";
import { ScrollComponent } from "./Scroll";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */

// const fruits = options.map(item => { const key = Object.keys(item)[0]; return item[key] });

/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Warehouse: React.FC = () => {
    const { isMobile, callback } = useMContext();

    const [list, setList] = useState(
        (comms as unknown as ConfigProps).config.options.map((item) => ({
            code: item.code,
            content: item.content,
        })),
    );

    callback.current.up[1] = (res: HandleUpFnProps) => {
        const arr = list ? [...list] : [];
        const n = arr.findIndex((item) => item.code === res.code);

        const status = hasStorageEl(res.x, res.y);

        if (status && n >= 0) {
            arr.splice(n, 1);
            setList([...arr]);
        } else if (n < 0 && !status) {
            arr.push({
                code: res.code,
                content: res.content,
            });
            setList([...arr]);
        }
    };
    return (
        <div className="warehouse_wrap">
            <div className="warehouse_total">
                共
                <span className={`warehouse_totalVal${list.length ? "" : " red"}`}>
                    {list.length}
                </span>
                项
            </div>

            {isMobile ? (
                <div className="warehouse_items">
                    <div className="warehouse_body">
                        <div
                            className="placeholder"
                            style={list?.length ? { display: "none" } : {}}
                        >
                            请将答案选项放置在这里
                        </div>
                        <Product list={list} />
                    </div>
                </div>
            ) : (
                <ScrollComponent
                    className="warehouse_scrollWrap"
                    bodyClassName="warehouse_scrollBody"
                    hidden={{
                        x: true,
                    }}
                >
                    <div className="warehouse_body">
                        <div
                            className="placeholder"
                            style={list?.length ? { display: "none" } : {}}
                        >
                            暂无可拖拽的选项
                        </div>
                        <Product list={list} />
                    </div>
                </ScrollComponent>
            )}
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
