/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect } from "react";
import { drawRoundRect } from "./unit";
import { useRef } from "react";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<{ type: "top" | "bottom" }> = ({ type }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [el, setEl] = useState<HTMLCanvasElement | null>(null);
    const timer = useRef<number>();
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const fn = () => {
            timer.current && window.clearTimeout(timer.current);

            if (!el) {
                return;
            }

            timer.current = window.setTimeout(() => {
                drawRoundRect(el, type);
                timer.current = undefined;
            });
        };
        fn();
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
            timer.current && window.clearTimeout(timer.current);
        };
    }, [el, type]);
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    if (el) {
        timer.current && window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => {
            drawRoundRect(el, type);
            timer.current = undefined;
        });
    }
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return (
        <>
            <div className="frame" />
            <canvas
                className="frameBorder"
                ref={(el) => {
                    setEl(el);
                }}
            />
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
