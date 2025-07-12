import { useMatch } from "react-router-dom";
interface DocumentBodyProps {
  children: React.ReactNode;
  className?: string
}

export const DashboardHeader = ({ children,className }: DocumentBodyProps) => {
  const isonHome = useMatch("/");
  return (
    <div
      className={`px-4 ${
        !isonHome ? "bg-[#F5F5F5]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
};
