import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
}

export function Button({
  loading = false,
  variant = "primary",
  fullWidth = false,
  children,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "px-6 py-4 rounded-lg font-semibold text-base transition-colors focus:outline-none";

  const variantStyles = {
    primary: disabled
      ? "bg-gray_2 text-gray_4 cursor-not-allowed"
      : "bg-main_4 text-white hover:bg-main_5 active:bg-main_5",
    secondary: disabled
      ? "bg-gray_1 text-gray_4 border border-gray_2 cursor-not-allowed"
      : "bg-white text-main_4 border border-main_4 hover:bg-main_6",
  };

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          처리 중...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
