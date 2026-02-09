import React from "react";
import { useRef } from "react";
import "../Input/TextArea.css";

function TxtArea({ ...props }, ref) {
  const textAreaRef = useRef(null);
  const handleInput = () => {
    const textArea = textAreaRef.current;
    textArea.style.height = "auto";
    textArea.style.height = textArea.scrollHeight + "px";
  };

  return (
    <textarea
      {...props}
      ref={(el) => {
        textAreaRef.current = el;
        if (ref) {
          ref(el);
        }
      }}
      onInput={handleInput}
      placeholder={props.placeholder ? props.placeholder : "What's happening?"}
      className="tweet-textarea"
    />
  );
}

export default React.forwardRef(TxtArea);
