import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import Suspense16 from "./Suspense16";

function AsyncBoundary({ errorFallback, pendingFallback, children }) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense16 fallback={pendingFallback}>{children}</Suspense16>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
