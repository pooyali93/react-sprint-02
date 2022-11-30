import React from "react";
import { useState } from "react";
import './Panel.css';

export default function Panel({children, title, opacity, isOpen= false}) {
 // Initialisation ---------
 const [ isCollapsed, setIsCollapsed] = useState(isOpen);
    // States ---------
    // Context ---------
    // Methods ---------
    const toggle = (e) => {
        if(isCollapsed === e) {
            return setIsCollapsed(!isOpen)
        }
        setIsCollapsed(e);
    }
    // View ---------
    return(
        <div className="container">
            <div className="panel">
                <div className="item">
                    <div className="title" onClick={() => toggle()}>
                        <h2>{title}</h2>
                        <span>{isCollapsed ? '-' : '+'} </span>
                    </div>
                    <div className="content">
                        {children}
                    </div>
                </div>
            </div>
            {
                isCollapsed && <main> {children} </main>
            }
        </div>
    );
}