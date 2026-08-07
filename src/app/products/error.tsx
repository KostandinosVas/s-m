"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type ProductsErrorProps = {
  error: Error;
  reset: () => void;
};

export default function ProductsError({ error, reset }: ProductsErrorProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleRetry() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>

      <p className="mt-3 text-gray-600">
        We could not load the products. Please try again.
      </p>

      {process.env.NODE_ENV === "development" && (
        <pre className="mt-4 overflow-x-auto rounded bg-gray-100 p-4 text-sm">
          {error.message}
        </pre>
      )}

      <button
        type="button"
        onClick={handleRetry}
        disabled={isPending}
        className="mt-6 rounded bg-black px-5 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {isPending ? "Retrying..." : "Try again"}
      </button>
    </main>
  );
}