/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useRef, useState } from "react";
import { drawRoundRect } from "./unit";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    style?: React.CSSProperties;
    className?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ style, className }) => {
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
            timer.current = window.setTimeout(() => {
                const node = el;
                timer.current = undefined;
                if (!node) {
                    return;
                }

                drawRoundRect(node);
            });
        };
        window.addEventListener("resize", fn);
        return () => {
            window.removeEventListener("resize", fn);
            timer.current && window.clearTimeout(timer.current);
        };
    }, [el]);

    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    timer.current && window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
        const node = el;
        timer.current = undefined;
        if (!node) {
            return;
        }

        drawRoundRect(node);
    });

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */

    return <canvas className={className} style={style} ref={(el) => setEl(el)} />;
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
