import { useState } from "react";
import { FiEdit2, FiTrash2, FiLock } from "react-icons/fi";

const fields = [
  { key: "role", label: "Role", readOnly: true },
  { key: "experienceLevel", label: "Experience Level" },
  { key: "location", label: "Location" },
  { key: "phone", label: "Phone" },
  { key: "bio", label: "Bio" },
  { key: "email", label: "Email" },
];

function UserBioDetails({ user, onFieldUpdate }) {
  const [hoverField, setHoverField] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const startEdit = (field) => {
    setEditingField(field);
    setInputValue(user[field] || "");
  };

  const saveEdit = async (field) => {
    await onFieldUpdate(field, inputValue);
    setEditingField(null);
  };

  const handleDelete = async (field) => {
    await onFieldUpdate(field, "");
  };

  return (
    <div className="w-full rounded border px-10 py-5 shadow">
      <h3 className="mb-4 text-lg font-semibold">Bio & other details</h3>
      <div className="grid grid-cols-2 gap-4">
        {fields.map(({ key, label, readOnly }) => (
          <div
            key={key}
            className="group relative rounded border-b p-4 hover:bg-gray-50"
            onMouseEnter={() => setHoverField(key)}
            onMouseLeave={() => setHoverField(null)}
          >
            <p className="text-gray-500">{label}</p>

            {editingField === key ? (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={() => saveEdit(key)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEdit(key);
                  if (e.key === "Escape") setEditingField(null);
                }}
                autoFocus
                className="mt-1 w-full border-b px-3 py-1 focus:outline-none"
              />
            ) : (
              <p className="font-medium">
                {key === "role"
                  ? user.isAdmin
                    ? "Admin"
                    : "User"
                  : user[key] || "-"}
              </p>
            )}

            {hoverField === key && !readOnly && editingField !== key && (
              <div className="absolute right-2 top-2 flex gap-2">
                <FiEdit2
                  className="h-4 w-4 cursor-pointer hover:text-blue-600"
                  onClick={() => startEdit(key)}
                />
                <FiTrash2
                  className="h-4 w-4 cursor-pointer hover:text-red-600"
                  onClick={() => handleDelete(key)}
                />
              </div>
            )}

            {readOnly && (
              <FiLock className="absolute right-2 top-2 h-4 w-4 text-gray-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserBioDetails;
