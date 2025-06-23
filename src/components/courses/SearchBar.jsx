const SearchBar = ({ value, onChange }) => {
    // Define the accent color for consistency with other components
    const accentPurple = '#8A4AF8';

    return (
        <form
            className={`
                mb-4 flex items-center
                bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 /* Changed from rounded-full to rounded-lg */
                focus-within:ring-2 focus-within:ring-[${accentPurple}] focus-within:border-transparent /* Adds a ring on focus */
                transition-all duration-200 /* Smooth transition for focus effect */
            `}
        >
            <input
                type="text"
                placeholder="Search courses..."
                className="
                    flex-grow h-10 /* Fixed height for alignment with button */
                    px-4 py-2.5 /* Padding inside the input field */
                    bg-transparent
                    placeholder-gray-500 text-gray-800 /* Placeholder and text color */
                    focus:outline-none /* Remove default input focus outline, parent handles ring */
                "
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button
                type="submit"
                className={`
                    h-10 px-4 py-2.5 /* Fixed height and padding for the button */
                    bg-[${accentPurple}] rounded-full /* Accent color background and full rounding for the button itself */
                    text-white hover:bg-[#7A3BD5] /* Text color and hover effect */
                    focus:outline-none focus:ring-2 focus:ring-[${accentPurple}] focus:ring-opacity-75 /* Focus ring for the button itself */
                    flex items-center justify-center
                    shadow-md transition-all duration-200 /* Smooth transitions and shadow */
                    -ml-2 /* Slightly overlaps the input for a more integrated look */
                `}
                aria-label="Search"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                    />
                </svg>
            </button>
        </form>
    );
};

export default SearchBar;