import React, { Suspense } from "react";
// import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundary from "./ErrorBoundary";
import CustomSuspense from "./CustomSuspense";

function AsyncBoundary({ rejectedFallback, pendingFallback, children }) {
  return (
    <ErrorBoundary fallback={rejectedFallback}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
