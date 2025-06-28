import { useState } from 'react';
import { SOCIAL_MEDIA_OPTIONS } from '../../contants/socialMedia';
import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';

function SocialMediaList({ socialMedia = [], onAdd, onUpdate, onDelete }) {
  const [isHover, setIsHover] = useState(false);
  const [adding, setAdding] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('');
  const [newLink, setNewLink] = useState('');

  const handleAddNew = () => {
    setAdding(true);
    setSelectedPlatform('');
    setNewLink('');
  };

  const handleDone = () => {
    if (selectedPlatform && newLink.trim()) {
      onAdd({ platform: selectedPlatform, url: newLink.trim() });
      setAdding(false);
    }
  };

  return (
    <div
      className="mt-10 border rounded-lg shadow p-6 relative hover:bg-gray-50"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h3 className="text-lg font-semibold mb-4">Social Media</h3>

      {/* Add New Button */}
      {isHover && !adding && (
        <button
          onClick={handleAddNew}
          className="absolute top-4 right-4 p-2 rounded hover:bg-gray-100 transition"
          title="Add New"
        >
          <FiPlus className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* Add New Form */}
      {adding && (
        <div className="mb-4 flex flex-col md:flex-row md:items-center gap-2">
          {/* Platform Dropdown */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-auto"
          >
            <option value="">Select Platform</option>
            {SOCIAL_MEDIA_OPTIONS.map((option) => (
              <option key={option.platform} value={option.platform}>
                {option.label}
              </option>
            ))}
          </select>

          {/* URL Input */}
          <input
            type="text"
            placeholder="Enter profile URL"
            value={newLink}
            onChange={(e) => setNewLink(e.target.value)}
            className="border px-3 py-2 rounded w-full md:w-1/2"
          />

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleDone}
              className="p-2 text-green-600 hover:bg-green-100 rounded"
              title="Done"
            >
              <FiCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setAdding(false)}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded"
              title="Cancel"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex gap-4 flex-wrap">
        {socialMedia.length > 0 ? (
          socialMedia.map((s, idx) => {
            const platformMeta = SOCIAL_MEDIA_OPTIONS.find(
              (opt) => opt.platform === s.platform
            );

            return (
              <div key={idx} className="relative group">
  <a
    href={s.url.startsWith('http') ? s.url : `https://${s.url}`}
    target="_blank"
    rel="noreferrer"
    className="block"
  >
    <div className="w-12 h-12 border border-gray-400 rounded-full flex items-center justify-center transition hover:scale-110">
      <img
        src={platformMeta?.icon || 'https://via.placeholder.com/32'}
        alt={s.platform}
        className="w-6 h-6 object-contain"
      />
    </div>
  </a>

  {/* Edit button: top-left */}
  <div className="absolute -top-2 -left-2 hidden group-hover:flex">
    <FiEdit2
      className="w-4 h-4 text-blue-500 cursor-pointer hover:scale-110"
      onClick={() => {
        setAdding(true);
        setSelectedPlatform(s.platform);
        setNewLink(s.url);
        onDelete(idx);
      }}
    />
  </div>

  {/* Delete button: top-right */}
  <div className="absolute -top-2 -right-[14px] hidden group-hover:flex">
    <FiTrash2
      className="w-4 h-4 text-red-500 cursor-pointer hover:scale-110"
      onClick={() => onDelete(idx)}
    />
  </div>
</div>
            );
          })
        ) : (
          <p className="text-gray-500">No social media links.</p>
        )}
      </div>
    </div>
  );
}

export default SocialMediaList;
