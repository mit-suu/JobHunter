import { useRef } from "react";
import { HiPencil } from "react-icons/hi";

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
      
      <h2 className="mt-4 truncate text-2xl font-bold text-gray-900 dark:text-white">{user.username}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">{user.role || 'Member'}</p>
    </div>
  );
}

export default AvatarCard;