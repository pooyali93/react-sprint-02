import React from "react";
import { useState } from "react";
import './Panel.css';

export default function Panel({children, title, opacity, isOpen= false}) {
 // Initialisation ---------
 const [ isCollapsed, setIsCollapsed] = useState(!isOpen);
    // States ---------
    // Context ---------
    // Methods ---------
    // View ---------
    return(
        <div className="Panel">
            <header onClick={() => setIsCollapsed(!isCollapsed)}>
                <span className="title">{title}</span>
                <span ></span>
            </header>
        </div>
    )
}