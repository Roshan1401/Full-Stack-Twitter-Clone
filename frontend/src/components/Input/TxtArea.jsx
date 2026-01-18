import React from 'react'
import { useRef } from 'react'
import "../Input/TextArea.css"

function TxtArea() {
    const textAreaRef = useRef(null)

    const handleInput = () => {
        const textArea = textAreaRef.current;
        textArea.style.height = 'auto';
        textArea.style.height = textArea.scrollHeight + 'px';
    }

    return (
        <textarea
            ref={textAreaRef}
            onInput={handleInput}
            placeholder="What's happening?"
            className="tweet-textarea"
        />
    )
}

export default TxtArea
