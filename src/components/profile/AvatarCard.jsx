import { useState } from 'react';
import { FiStar, FiLock ,FiX  } from 'react-icons/fi';

function AvatarCard({ user, onUpdateAvatar }) {
  const [isHover, setIsHover] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');

  const handleIconClick = () => {
    setEditingAvatar(true);
    setNewAvatarUrl(user.avatar || '');
  };

  const handleSaveAvatar = async () => {
    if (newAvatarUrl.trim()) {
      await onUpdateAvatar(newAvatarUrl);
    }
    setEditingAvatar(false);
  };
  const handleCancel = () => {
    setEditingAvatar(false);
    setNewAvatarUrl(''); // reset URL về rỗng để giữ avatar cũ
  };

  return (
    <div
      className={`flex flex-col items-center p-6 border rounded-lg shadow w-full md:w-1/3 transition ${
        isHover ? 'bg-gray-50' : ''
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {/* Name & Premium */}
      <div className="text-center m-4">
        <h2 className="text-3xl font-bold">
          {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
        </h2>
        <div className="flex items-center justify-center mt-1">
          {user.isPremium ? (
            <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <FiStar className="w-4 h-4" /> Premium User
            </span>
          ) : (
            <span className="flex items-center gap-1 text-gray-400 text-sm font-medium">
              <FiLock className="w-4 h-4" /> Standard User
            </span>
          )}
        </div>
      </div>

      {/* Avatar Container */}
      <div className="relative p-4 border border-gray-200 bg-gray-200 rounded-full shadow-lg">
        <img
          src={editingAvatar && newAvatarUrl.trim() ? newAvatarUrl : (user.avatar || 'https://via.placeholder.com/150')}
          alt="avatar"
          className="w-40 h-40 rounded-full object-cover"
        />

        {/* Hover icon center */}
        {isHover && !editingAvatar && (
          <button
            onClick={handleIconClick}
            className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Input box + Preview */}
        {editingAvatar && (
        <div className="mt-4 w-full relative">
          <button
            onClick={handleCancel}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
            title="Cancel"
          >
            <FiX className="w-5 h-5" />
          </button>

          <input
            type="text"
            value={newAvatarUrl}
            onChange={(e) => setNewAvatarUrl(e.target.value)}
            onBlur={handleSaveAvatar}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveAvatar();
              if (e.key === 'Escape') handleCancel();
            }}
            placeholder="Paste new avatar URL..."
            autoFocus
            className="w-full  pl-4 pr-9 py-2 border rounded focus:outline-none"
          />

          {/* Preview */}

        </div>
      )}
    </div>
  );
}

export default AvatarCard;
