interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="text-subtitle2 font-bold text-gray_8 px-6 py-4 text-left">
      {children}
    </h2>
  );
}
