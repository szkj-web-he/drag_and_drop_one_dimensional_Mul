/**
 * @file hr
 * @date 2022-07-18
 * @author xuejie.he
 * @lastModify xuejie.he 2022-07-18
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useRef, useEffect, useState } from "react";
import hr from "./Assets/img/hr.png";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface TempProps {
    className?: string;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Temp: React.FC<TempProps> = ({ className }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const ref = useRef<HTMLDivElement | null>(null);

    const [width, setWidth] = useState<number>(654);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    useEffect(() => {
        const fn = () => {
            const node = ref.current;
            if (!node) {
                return;
            }

            setWidth(node.offsetWidth - 11);
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
        <div className={`hr ${className ? ` ${className}` : ""}`} ref={ref}>
            <svg
                className="hr_icon"
                viewBox={`0 0 ${width} 13`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d={`M7.62259 1.07324L0.977539 7.99728L5.13685 12.3312L5.23235 12.2317L1.16854 7.99728L7.62264 1.27221L14.0836 7.9973L10.0198 12.2317L10.0207 12.2327H10.0193V12.3735H${
                        width - 2
                    }.618V12.2327H10.2098L14.2746 7.99725L7.62259 1.07324Z`}
                    fill="url(#paint0_linear_5736_14868)"
                    fillOpacity="0.6"
                    stroke="url(#paint1_linear_5736_14868)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <rect
                    width="3.04512"
                    height="3.04512"
                    transform="matrix(0.698639 0.715474 -0.698639 0.715474 7.61963 5.58594)"
                    fill="url(#paint2_linear_5736_14868)"
                    fillOpacity="0.6"
                />
                <defs>
                    <linearGradient
                        id="paint0_linear_5736_14868"
                        x1="123.16"
                        y1="5.31082"
                        x2="125.523"
                        y2="42.0941"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#00FFF0" />
                        <stop offset="1" stopColor="#01D1FF" />
                    </linearGradient>
                    <linearGradient
                        id="paint1_linear_5736_14868"
                        x1="326.798"
                        y1="1.07324"
                        x2="326.798"
                        y2="12.3735"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#00FFF0" />
                        <stop offset="1" stopColor="#01D1FF" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient
                        id="paint2_linear_5736_14868"
                        x1="0.570959"
                        y1="1.14192"
                        x2="3.07568"
                        y2="1.81819"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#00FFF0" />
                        <stop offset="1" stopColor="#01D1FF" />
                    </linearGradient>
                </defs>
            </svg>
            <img src={hr} className="hr_last" alt="" />
        </div>
    );
};
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */

export default Temp;
