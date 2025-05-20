import AppHeaderAuth from "@/layout/AppHeaderAuth";

export default function FullWidthPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
  <div className="min-h-screen xl:flex relative">
      {/* Sidebar and Backdrop */}
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all  duration-300 ease-in-out`}
      >
        {/* Header */}
        <AppHeaderAuth />
        {/* Page Content */}
        <div className="mx-auto">{children}</div>
      </div>
    </div>);
}
