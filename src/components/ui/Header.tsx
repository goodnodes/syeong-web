import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
}

export function Header({ title, subtitle, icon }: HeaderProps) {
  return (
    <div className="w-full px-6 py-6 text-left">
      {icon && (
        <div className="mb-4 flex justify-start">
          {icon}
        </div>
      )}
      <h1 className="text-title5 font-bold text-gray_8 mb-2 leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-body2 text-gray_5 whitespace-pre-line leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
