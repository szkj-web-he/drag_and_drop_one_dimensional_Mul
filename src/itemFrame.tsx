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
    // const [el, setEl] = useState<HTMLCanvasElement | null>(null);

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

            const r = 6;
            //右下角
            ctx.arc(width - r, height - r, r, 0, Math.PI / 2);
            ctx.lineTo(r + x, height);

            //左下角
            ctx.arc(r + x, height - r, r, Math.PI / 2, Math.PI);
            ctx.lineTo(x, r + y);

            //左上角
            ctx.arc(r + x, r + y, r, Math.PI, (Math.PI / 2) * 3);
            ctx.lineTo(width - r, y);

            //右上角
            ctx.arc(width - r, r + y, r, (Math.PI / 2) * 3, Math.PI * 2);
            ctx.lineTo(width, height - r);

            ctx.closePath();
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

                const bg = ctx.createLinearGradient(-14, -12.5, width, height - 4);
                bg.addColorStop(0, "rgba(87,241,241,0.36)");
                bg.addColorStop(1, "rgba(0,69,166,0.4)");
                ctx.fillStyle = bg;
                ctx.fill();

                const strokeStyle = ctx.createLinearGradient(4.5, -3.5, width + 13, height + 11.5);
                strokeStyle.addColorStop(0, "#57F1F1");
                strokeStyle.addColorStop(1, "#007EFE");
                ctx.restore();
                ctx.strokeStyle = strokeStyle;

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

    return <canvas className={className} style={style} ref={ref} />;
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
export default Temp;
