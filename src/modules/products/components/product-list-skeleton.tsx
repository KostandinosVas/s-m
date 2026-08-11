export function ProductListSkeleton() {
  return (
    <ul className="space-y-3">
      {[0, 1, 2, 3].map((index) => (
        <li key={index} className="rounded border p-4">
          <div className="h-5 w-48 rounded bg-gray-200" />
          <div className="mt-2 h-4 w-64 rounded bg-gray-100" />
          <div className="mt-3 h-5 w-20 rounded bg-gray-200" />
        </li>
      ))}
    </ul>
  );
}