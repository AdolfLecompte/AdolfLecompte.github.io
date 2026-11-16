import { DocsSidebar } from "../../components/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="wrap docs">
      <DocsSidebar />
      <div className="plate">{children}</div>
    </main>
  );
}
