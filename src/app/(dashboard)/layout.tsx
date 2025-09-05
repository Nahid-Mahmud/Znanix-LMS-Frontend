import DashboardWrapper from "@/wrapper/DashboardWrapper";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
