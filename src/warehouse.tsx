/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */

import React from "react";
import { Product } from "./product";
import { OptionProps } from "./unit";
import { useMContext } from "./context";
import { ScrollComponent } from "./Scroll";
import Frame from "./frame";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */

// const fruits = options.map(item => { const key = Object.keys(item)[0]; return item[key] });

/** This section will include all the interface for this tsx file */
export interface WarehouseProps {
    list: Array<OptionProps>;
}

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Warehouse: React.FC<WarehouseProps> = ({ list }) => {
    const { isMobile } = useMContext();

    const content = (
        <div className="warehouse_body">
            <div className="placeholder" style={list?.length ? { display: "none" } : {}}>
                暂无可拖拽的选项
            </div>
            <Product list={list} />
        </div>
    );
    return (
        <div className="warehouse_wrap">
            <div className="warehouse_total">
                共
                <span className={`warehouse_totalVal${list.length ? "" : " red"}`}>
                    {list.length}
                </span>
                项
            </div>
            <div className="warehouse_container">
                <Frame type="top" />
                {isMobile ? (
                    <div className="warehouse_items">{content}</div>
                ) : (
                    <ScrollComponent
                        className="warehouse_scrollWrap"
                        bodyClassName="warehouse_scrollBody"
                        hidden={{
                            x: true,
                        }}
                    >
                        {content}
                    </ScrollComponent>
                )}
            </div>
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
