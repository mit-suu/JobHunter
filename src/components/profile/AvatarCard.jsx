import { useRef } from "react";
import { HiPencil } from "react-icons/hi";
import { FiStar, FiLock, FiX } from "react-icons/fi";

function AvatarCard({ user, onAvatarUpload, isUploading }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onAvatarUpload(file); 
    }
  };

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="w-full rounded-lg border bg-white p-6 text-center shadow-md dark:border-gray-700 dark:bg-gray-800 md:w-1/3">
      <div className="relative mx-auto h-40 w-40 sm:h-48 sm:w-48">
        <img
          src={user.avatar || 'https://i.stack.imgur.com/l60Hf.png'} 
          alt="User Avatar"
          className={`h-full w-full rounded-full border-4 object-cover shadow-lg transition-opacity duration-300 dark:border-gray-600 ${
            isUploading ? "opacity-50" : "opacity-100"
          }`}
        />
        <button
          onClick={handleEditClick}
          disabled={isUploading}
          className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          title="Change Avatar"
        >
          {isUploading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : (
            <HiPencil className="h-6 w-6" />
          )}
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/gif"
        />
      </div>
      
      {isUploading && <p className="mt-4 animate-pulse text-sm font-semibold text-purple-600 dark:text-purple-400">Uploading...</p>}
      
      {/* Name & Premium */}
      <div className="m-4 text-center">
        <h2 className="text-3xl font-bold">
          {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
        </h2>
        <div className="mt-1 flex items-center justify-center">
          {user.isPremium ? (
            <span className="flex items-center gap-1 text-sm font-medium text-green-600">
              <FiStar className="h-4 w-4" /> Premium User
            </span>
          ) : (
            <span className="flex items-center gap-1 text-sm font-medium text-gray-400">
              <FiLock className="h-4 w-4" /> Standard User
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default AvatarCard;