import DesktopSidebar from "./DesktopSidebar";

async function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full">
      <DesktopSidebar />
      <aside className="lg:pl-20 h-full">{children}</aside>
    </main>
  );
}

export default Sidebar;
