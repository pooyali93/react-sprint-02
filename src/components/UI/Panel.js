import React from "react";
import { useState } from "react";
import './Panel.scss';
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export default function Panel({children, title, opacity}) {
 // Initialisation ---------
 const [ isCollapsed, setIsCollapsed] = useState(false);
    // States ---------
    // Context ---------
    // Methods ---------

    const collapseCard = () => setIsCollapsed(!isCollapsed)
    // View ---------
    return(
            <div className="panel">
                <div className="item">
                    <div className="title" onClick={collapseCard}>
                        <h2>{title}</h2>
                        <span>{isCollapsed ? <FaAngleUp/> : <FaAngleDown/>} </span>
                    </div>
                                       
                </div>
                {
                    isCollapsed && <div className="content">{children} </div>
                }
            </div>
    );
}