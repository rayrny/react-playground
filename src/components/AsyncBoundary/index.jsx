import React, { Suspense } from "react";
// import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundary from "./ErrorBoundary";
import CustomSuspense from "./CustomSuspense";

function AsyncBoundary({ errorFallback, pendingFallback, children }) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={pendingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
