export function ProductListSkeleton() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <li key={index} className="rounded border p-4">
          <div className="h-3 w-20 rounded bg-gray-100" />
          <div className="mt-2 h-5 w-32 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-full rounded bg-gray-100" />
          <div className="mt-3 h-5 w-16 rounded bg-gray-200" />
        </li>
      ))}
    </ul>
  );
}