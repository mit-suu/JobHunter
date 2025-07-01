import { useState } from "react";
import { SOCIAL_MEDIA_OPTIONS } from "../../contants/socialMedia";
import { FiPlus, FiTrash2, FiEdit2, FiCheck, FiX } from "react-icons/fi";

function SocialMediaList({ socialMedia = [], onAdd, onUpdate, onDelete }) {
  const [isHover, setIsHover] = useState(false);
  const [adding, setAdding] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [newLink, setNewLink] = useState("");

  const handleAddNew = () => {
    setAdding(true);
    setSelectedPlatform("");
    setNewLink("");
  };

  const handleDone = () => {
    if (selectedPlatform && newLink.trim()) {
      onAdd({ platform: selectedPlatform, url: newLink.trim() });
      setAdding(false);
    }
  };

  return (
    <div
      className="relative mt-10 rounded-lg border p-6 shadow hover:bg-gray-50 bg-white dark:shadow-[0_4px_6px_-1px_rgba(255,255,255,0.2)] transition"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <h3 className="mb-4 text-lg font-semibold">Social Media</h3>

      {/* Add New Button */}
      {isHover && !adding && (
        <button
          onClick={handleAddNew}
          className="absolute right-4 top-4 rounded p-2 transition hover:bg-gray-100"
          title="Add New"
        >
          <FiPlus className="h-5 w-5 text-gray-600" />
        </button>
      )}

      {/* Add New Form */}
      {adding && (
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center">
          {/* Platform Dropdown */}
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full rounded border px-3 py-2 md:w-auto"
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
            className="w-full rounded border px-3 py-2 md:w-1/2"
          />

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleDone}
              className="rounded p-2 text-green-600 hover:bg-green-100"
              title="Done"
            >
              <FiCheck className="h-5 w-5" />
            </button>
            <button
              onClick={() => setAdding(false)}
              className="rounded p-2 text-gray-500 hover:bg-gray-100"
              title="Cancel"
            >
              <FiX className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex flex-wrap gap-4">
        {socialMedia.length > 0 ? (
          socialMedia.map((s, idx) => {
            const platformMeta = SOCIAL_MEDIA_OPTIONS.find(
              (opt) => opt.platform === s.platform,
            );

            return (
              <div key={idx} className="group relative">
                <a
                  href={s.url.startsWith("http") ? s.url : `https://${s.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-400 transition hover:scale-110">
                    <img
                      src={
                        platformMeta?.icon || "https://via.placeholder.com/32"
                      }
                      alt={s.platform}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                </a>

                {/* Edit button: top-left */}
                <div className="absolute -left-2 -top-2 hidden group-hover:flex">
                  <FiEdit2
                    className="h-4 w-4 cursor-pointer text-blue-500 hover:scale-110"
                    onClick={() => {
                      setAdding(true);
                      setSelectedPlatform(s.platform);
                      setNewLink(s.url);
                      onDelete(idx);
                    }}
                  />
                </div>

                {/* Delete button: top-right */}
                <div className="absolute -right-[14px] -top-2 hidden group-hover:flex">
                  <FiTrash2
                    className="h-4 w-4 cursor-pointer text-red-500 hover:scale-110"
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
