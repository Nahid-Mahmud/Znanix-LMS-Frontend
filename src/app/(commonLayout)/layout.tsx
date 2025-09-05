import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";

export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
