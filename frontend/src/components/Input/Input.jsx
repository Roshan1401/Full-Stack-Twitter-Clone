import { useId } from "react";
import "../Input/Input.css";

function Input({ type = "text", className = "", ref, id: externalId, ...props }) {
  const generatedId = useId();
  const id = externalId || generatedId;
  return (
    <div className="input-container text-white">
      <input
        type={type}
        className={`${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
}

export default Input;
