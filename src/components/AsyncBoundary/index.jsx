import React, { Suspense } from "react";
// import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundary from "./ErrorBoundary";
import Suspense16 from "./Suspense16";

function AsyncBoundary({ errorFallback, pendingFallback, children }) {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={pendingFallback}>
        {/* <Suspense16 fallback={pendingFallback}> */}
        {children}
        {/* </Suspense16> */}
      </Suspense>
    </ErrorBoundary>
  );
}

export default AsyncBoundary;
