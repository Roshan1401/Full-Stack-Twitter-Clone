import React, { useId } from 'react'
import "../Input/Input.css"

function Input({ type = "text", className = "", ...props }, ref) {
    const id = useId()
    return (
        <div className="input-container">
            <input type={type}
                className={`${className}`}
                ref={ref}
                {...props}
                id={id} />
        </div>
    )
}

export default React.forwardRef(Input)
