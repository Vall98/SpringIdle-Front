export function InputField({ label, id, type = 'text', required = false }:
  {label: string, id: string, type: string, required: boolean}) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-[#e8f0fe]"
      />
    </div>
  );
}
