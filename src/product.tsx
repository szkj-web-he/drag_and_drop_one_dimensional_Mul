/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { stopSelect } from "./Scroll/Unit/noSelected";
import { useMContext } from "./context";
import { getScrollValue } from "./getScrollValue";
import { OptionProps, PointProps } from "./unit";

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
export interface ProductProps {
    list: Array<OptionProps>;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
export const Product: React.FC<ProductProps> = ({ list }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/

    const { isMobile, callback } = useMContext();

    const selectedFn = useRef<typeof document.onselectstart>(null);

    const point = useRef<PointProps>({
        pageX: 0,
        pageY: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });

    const canMove = useRef(false);

    const selectRef = useRef<OptionProps>();

    const [selectItem, setSelectItem] = useState(
        selectRef.current ? { ...selectRef.current } : undefined,
    );

    const [position, setPosition] = useState<PointProps>();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/

    // 当移动时
    const handleMove = (e: MouseEvent | React.TouchEvent<HTMLDivElement>) => {
        if (!canMove.current) return;
        let x = 0;
        let y = 0;
        if (e instanceof MouseEvent) {
            x = e.pageX;
            y = e.pageY;
        } else {
            const position = e.changedTouches[0];
            x = position.pageX;
            y = position.pageY;
        }
        const moveX = x - point.current.pageX;
        const moveY = y - point.current.pageY;

        point.current.x = moveX + point.current.x;
        point.current.y = moveY + point.current.y;
        point.current.pageX = x;
        point.current.pageY = y;
        callback.current.move?.(x, y);

        setPosition({
            ...point.current,
        });
    };

    // 当鼠标 或者手 弹起时的通用事件
    const handleUp = () => {
        for (let i = 0; i < callback.current.up.length; i++) {
            callback.current.up[i]({
                x: point.current.pageX,
                y: point.current.pageY,
                code: selectRef.current?.code ?? "",
                content: selectRef.current?.content ?? "",
            });
        }

        document.onselectstart = selectedFn.current;
        point.current = {
            x: 0,
            y: 0,
            pageX: 0,
            pageY: 0,
            width: 0,
            height: 0,
        };
        setPosition(undefined);
        selectRef.current = undefined;
        setSelectItem(undefined);
    };

    // 当鼠标弹起时
    const handleMouseUp = () => {
        handleUp();
        document.removeEventListener("mousemove", handleMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    // 当手离开屏幕时
    const handleTouchEnd = () => {
        if (!canMove.current) return;
        handleUp();
    };

    // 手或者鼠标 按下的通用事件
    const handleDown = (
        item: OptionProps,
        e: React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>,
        position: {
            x: number;
            y: number;
        },
    ) => {
        canMove.current = true;

        selectRef.current = {
            code: item.code,
            content: item.content,
        };
        setSelectItem({
            ...selectRef.current,
        });

        stopSelect(e, selectedFn, true);

        const scrollData = getScrollValue();
        const rect = e.currentTarget.getBoundingClientRect();
        const rectX = rect.left + scrollData.x;
        const rectY = rect.top + scrollData.y;

        point.current = {
            pageX: position.x,
            pageY: position.y,
            x: rectX,
            y: rectY,
            width: rect.width,
            height: rect.height,
        };
        setPosition({
            ...point.current,
        });
    };

    // 当鼠标按下时
    const handleMouseDown = (
        item: OptionProps,
        e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    ) => {
        handleDown(item, e, {
            x: e.pageX,
            y: e.pageY,
        });
        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    //当手触摸时
    const handleTouchStart = (item: OptionProps, e: React.TouchEvent<HTMLDivElement>) => {
        const position = e.changedTouches[0];
        e.stopPropagation();
        handleDown(item, e, {
            x: position.pageX,
            y: position.pageY,
        });
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            {list.map((item) => {
                return (
                    <div
                        className={`item${selectItem?.code === item.code ? " gray" : ""}`}
                        key={item.code}
                        {...(isMobile
                            ? {
                                  onTouchStart: (e) => {
                                      handleTouchStart(item, e);
                                  },
                                  onTouchMove: handleMove,
                                  onTouchEnd: handleTouchEnd,
                              }
                            : {
                                  onMouseDown: (e) => {
                                      handleMouseDown(item, e);
                                  },
                              })}
                        dangerouslySetInnerHTML={{
                            __html: item.content,
                        }}
                    />
                );
            })}

            {!!position &&
                createPortal(
                    <div
                        className="floating"
                        style={{
                            left: `${position.x}px`,
                            top: `${position.y}px`,
                            width: `${position.width}px`,
                            height: `${position.height}px`,
                        }}
                        dangerouslySetInnerHTML={{
                            __html: selectItem?.content ?? "",
                        }}
                    />,
                    document.querySelector("body>div") ?? document.body,
                )}
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
