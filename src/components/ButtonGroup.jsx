export default function ButtonGroup({ options, selected, onChange }) {
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className={`px-3 py-1 rounded-full text-sm border 
            ${
              selected === option
                ? "bg-sky-500 text-white border-sky-500"
                : "bg-white text-gray-700 border-gray-300 hover:border-sky-400"
            }`}
        >
          {capitalize(option)}
        </button>
      ))}
    </div>
  );
}
