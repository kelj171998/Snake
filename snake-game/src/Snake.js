import React from 'react';

export default (props) => {
    return (
        <div>
            {props.snakeDots.map((dot, i) => {
                let x = dot[0];
                let y = dot[1];

                const style = {
                    left: `${x}%`,
                    top: `${y}%`
                }
                return (
                    <div className="snake-dot" key={i} style={style}></div>
                )
            })}
        </div>
    )
}