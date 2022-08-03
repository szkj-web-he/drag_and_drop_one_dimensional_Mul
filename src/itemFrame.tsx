/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef } from "react";
import { useLayoutEffect } from "react";
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

    const ref = useRef<HTMLCanvasElement | null>(null);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useLayoutEffect(() => {
        const drawRoundRectPath = (
            ctx: CanvasRenderingContext2D,
            width: number,
            height: number,
            x: number,
            y: number,
        ) => {
            ctx.beginPath();

            const r = 2;
            //右下角
            ctx.arc(width - r, height - r, r, 0, Math.PI / 2);
            ctx.lineTo(r + x, height);

            //左下角
            ctx.arc(r + x, height - r, r, Math.PI / 2, Math.PI);
            ctx.lineTo(x, r + y);

            //左上角
            ctx.arc(r + x, r + y, r, Math.PI, (Math.PI / 2) * 3);
            ctx.lineTo(width - 11 - r, y);

            //右上角1
            ctx.arc(width - 11 - r, r + y, r, (Math.PI / 2) * 3, (Math.PI / 2) * 3 + Math.PI / 4);
            ctx.lineTo(width, r + 11 + y);

            //右上角2
            ctx.arc(width - r, r + r + 11 + y, r, (Math.PI / 2) * 3 + Math.PI / 4, Math.PI * 2);
            ctx.lineTo(width, height - r);
        };

        const fn = () => {
            const node = ref.current;
            if (!node) {
                return;
            }
            const parent = node.parentElement;

            if (parent instanceof HTMLElement) {
                const width = parent.offsetWidth ?? 52;
                const height = parent.offsetHeight ?? 37;

                const ctx = node.getContext("2d");
                if (!ctx) {
                    return;
                }
                ctx.clearRect(0, 0, width, height);

                node.width = width;
                node.height = height;

                drawRoundRectPath(ctx, width - 1, height - 1, 1, 1);
                ctx.save();

                ctx.fillStyle = "rgba(255,255,255,0.8)";
                ctx.fill();

                ctx.restore();
                ctx.strokeStyle = "#55E5F2";

                ctx.lineWidth = 0.6;

                ctx.stroke();
            }
        };
        fn();
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
        <>
            <canvas className={className} style={style} ref={ref} />
            <div className="triangle" />
        </>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
