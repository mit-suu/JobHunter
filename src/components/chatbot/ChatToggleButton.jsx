
import { FaRobot } from "react-icons/fa6";

export default function ChatToggleButton({ onToggle, isOpen }) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#26A4FF] text-xl text-white shadow-lg transition-all hover:bg-blue-700"
      aria-label="Toggle Chat"
    >
      {isOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <FaRobot />
      )}
    </button>
  );
}
