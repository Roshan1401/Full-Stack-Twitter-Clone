import React from 'react'

function Container({ children }) {
    return (
        <div style={{
            width: "100%",
            maxWidth: "80rem",
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "1rem",
            paddingRight: "1rem",
        }}>{children}</div>
    )
}

export default Container
