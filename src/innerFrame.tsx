/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from "react";
import "./style.scss";
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */

/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */

const Temp: React.FC<{ active: boolean }> = ({ active }) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={`innerFrame${active ? " active" : ""}`}>
            <div className="innerFrame_left">
                <div className="innerFrame_leftCircle" />
                <div className="innerFrame_leftLine" />
            </div>
            <div className="innerFrame_center">
                <div className="innerFrame_topLine" />
                <div className="innerFrame_bottomLine" />
            </div>
            <div className="innerFrame_right">
                <div className="innerFrame_rightLine" />
                <div className="innerFrame_rightCircle" />
            </div>
        </div>
    );
};
export default Temp;
