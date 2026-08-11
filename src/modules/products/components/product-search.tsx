type ProductSearchProps = {
  defaultValue?: string | undefined;
};

export function ProductSearch({ defaultValue }: ProductSearchProps) {
  return (
    <form action="/products" className="mb-6 flex gap-2">
      <input
        type="search"
        name="search"
        defaultValue={defaultValue}
        placeholder="Search products..."
        className="flex-1 rounded border px-3 py-2"
      />
      <button
        type="submit"
        className="rounded bg-black px-5 py-2 text-white hover:bg-gray-800"
      >
        Search
      </button>
    </form>
  );
}