import React, { Suspense } from "react";
const DemoPageWrapper = React.lazy(() => import("../components/DemoPageWrapper"));

function DemoPage() {
  return (
    <Suspense
      fallback={
        <>
          Loading...
        </>
      }
    >
      <DemoPageWrapper />
    </Suspense>
  );
}

export default DemoPage;
