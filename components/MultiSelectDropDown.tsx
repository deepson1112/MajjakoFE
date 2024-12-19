// Import necessary hooks and types from React
import {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  MouseEvent,
  ReactElement,
  Dispatch,
  SetStateAction,
} from "react";

// Define an interface for the component props
interface MultiSelectDropdownProps {
  formFieldName: string;
  options: string[]; // Assuming options are an array of strings
  onChange: (selectedOptions: number[]) => void; // Function type that takes an array of strings
  prompt?: string;
  selectedOptions: number[];
  setSelectedOptions: Dispatch<SetStateAction<number[]>>;
}

// Define the component with TypeScript
const MultiSelectDropdown = ({
  formFieldName,
  options,
  onChange,
  prompt = "Select one or more options",
  selectedOptions,
  setSelectedOptions,
}: MultiSelectDropdownProps): ReactElement => {
  const [isJsEnabled, setIsJsEnabled] = useState<boolean>(false);
  const optionsListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    setIsJsEnabled(true);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const isChecked = e.target.checked;
    const option = Number(e.target.value);

    const selectedOptionSet = new Set(selectedOptions);

    if (isChecked) {
      selectedOptionSet.add(option);
    } else {
      selectedOptionSet.delete(option);
    }

    const newSelectedOptions = Array.from(selectedOptionSet);

    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const isSelectAllEnabled = selectedOptions.length < options.length;

  const handleSelectAllClick = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    if (optionsListRef.current) {
      const optionsInputs = optionsListRef.current.querySelectorAll("input");
      optionsInputs.forEach((input) => {
        input.checked = true;
      });
    }

    setSelectedOptions([0, 1, 2, 3, 4, 5, 6]);
    onChange([0, 1, 2, 3, 4, 5, 6]);
  };

  const isClearSelectionEnabled = selectedOptions.length > 0;

  const handleClearSelectionClick = (
    e: MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();

    if (optionsListRef.current) {
      const optionsInputs = optionsListRef.current.querySelectorAll("input");
      optionsInputs.forEach((input) => {
        input.checked = false;
      });
    }

    setSelectedOptions([]);
    onChange([]);
  };

  return (
    <label className="relative">
      <input type="checkbox" className="hidden peer" />

      <div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform inline-flex border rounded px-5 py-2 rounded-md">
        {prompt}
        {isJsEnabled && selectedOptions.length > 0 && (
          <span className="ml-1 text-brand">{`(${selectedOptions.length} selected)`}</span>
        )}
      </div>

      <div className="absolute bg-white border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto w-full max-h-60 overflow-y-scroll">
        {isJsEnabled && (
          <ul>
            <li>
              <button
                onClick={handleSelectAllClick}
                disabled={!isSelectAllEnabled}
                className="w-full text-left px-2 py-1 text-brand disabled:opacity-50"
              >
                {"Select All"}
              </button>
            </li>
            <li>
              <button
                onClick={handleClearSelectionClick}
                disabled={!isClearSelectionEnabled}
                className="w-full text-left px-2 py-1 text-brand disabled:opacity-50"
              >
                {"Clear selection"}
              </button>
            </li>
          </ul>
        )}
        <ul ref={optionsListRef}>
          {options.map((option, index) => (
            <li key={option}>
              <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200">
                <input
                  type="checkbox"
                  name={formFieldName}
                  value={index}
                  className="cursor-pointer"
                  onChange={handleChange}
                  checked={selectedOptions.includes(index)}
                />
                <span className="ml-1">{option}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </label>
  );
};

export default MultiSelectDropdown;
