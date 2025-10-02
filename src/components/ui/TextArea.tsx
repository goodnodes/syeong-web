import { useState } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  help?: string | null;
  hasError?: boolean;
  minHeight?: string;
}

export function TextArea({
  label,
  help,
  hasError,
  minHeight = "120px",
  className = "",
  ...props
}: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray_8 mb-2 text-left">
          {label}
        </label>
      )}
      <textarea
        {...props}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        style={{ minHeight, ...props.style }}
        className={`
          w-full px-4 py-3 rounded-lg border transition-colors resize-none
          ${hasError ? "border-red_1 bg-red-50" : isFocused ? "border-main_4 bg-white" : "border-gray_2 bg-white"}
          ${props.disabled ? "bg-gray_1 text-gray_4 cursor-not-allowed" : "text-gray_8"}
          focus:outline-none text-base
        `}
      />
      {help && (
        <p className={`text-xs mt-1 text-left ${hasError ? "text-red_1" : "text-gray_4"}`}>
          {help}
        </p>
      )}
    </div>
  );
}
