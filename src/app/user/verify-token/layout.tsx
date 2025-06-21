import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="text-white p-8">Loading page...</div>}>
      {children}
    </Suspense>
  );
}
