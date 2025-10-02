import { useState } from "react";
import type { InputHTMLAttributes } from "react";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  help?: string | null;
  hasError?: boolean;
  onClear?: () => void;
}

export function TextField({
  label,
  help,
  hasError,
  onClear,
  className = "",
  ...props
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray_8 mb-2 text-left">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...props}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          className={`
            w-full px-4 py-3 rounded-lg border transition-colors
            ${hasError ? "border-red_1 bg-red-50" : isFocused ? "border-main_4 bg-white" : "border-gray_2 bg-white"}
            ${props.disabled ? "bg-gray_1 text-gray_4 cursor-not-allowed" : "text-gray_8"}
            focus:outline-none text-base
          `}
        />
        {onClear && props.value && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray_2 hover:text-gray_4"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 0C4.47 0 0 4.47 0 10s4.47 10 10 10 10-4.47 10-10S15.53 0 10 0zm5 13.59L13.59 15 10 11.41 6.41 15 5 13.59 8.59 10 5 6.41 6.41 5 10 8.59 13.59 5 15 6.41 11.41 10 15 13.59z"/>
            </svg>
          </button>
        )}
      </div>
      {help && (
        <p className={`text-xs mt-1 text-left ${hasError ? "text-red_1" : "text-gray_4"}`}>
          {help}
        </p>
      )}
    </div>
  );
}
