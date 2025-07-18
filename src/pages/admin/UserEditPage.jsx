import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser, getUsers } from "../../services/userService";
import AvatarCard from "../../components/profile/AvatarCard";
import SocialMediaList from "../../components/profile/SocialMediaList";
import UserBioDetails from "../../components/profile/UserBioDetails";
import { motion } from "framer-motion";

const UserEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const users = await getUsers();
      const foundUser = users.find((u) => u.id === id);
      if (foundUser) {
        setUser(foundUser);
      }
    };
    fetchUser();
  }, [id]);

  const handleAvatarUpload = async (file) => {
    setIsUploading(true);
    try {
      // giả lập upload - bạn có thể thay bằng upload thực tế lên server
      const reader = new FileReader();
      reader.onloadend = async () => {
        const newAvatarUrl = reader.result;
        const updated = await updateUser(id, { avatar: newAvatarUrl });
        if (updated) {
          setUser((prev) => ({ ...prev, avatar: newAvatarUrl }));
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Upload thất bại", err);
      setIsUploading(false);
    }
  };

  const handleFieldUpdate = async (field, value) => {
    const updated = await updateUser(id, { [field]: value });
    if (updated) {
      setUser((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleAddSocial = async (entry) => {
    const updatedList = [...(user.socialMedia || []), entry];
    const updated = await updateUser(id, { socialMedia: updatedList });
    if (updated) {
      setUser((prev) => ({ ...prev, socialMedia: updatedList }));
    }
  };

  const handleDeleteSocial = async (index) => {
    const updatedList = user.socialMedia.filter((_, i) => i !== index);
    const updated = await updateUser(id, { socialMedia: updatedList });
    if (updated) {
      setUser((prev) => ({ ...prev, socialMedia: updatedList }));
    }
  };

  if (!user) return <div className="text-center mt-10">Đang tải...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >

    <div className="max-w-5xl mx-auto py-12 space-y-10">
<h2 className="font-poppins text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
    <span className="text-[#26A4FF]"> Edit</span> user information
  </h2>
      <div className="flex flex-col md:flex-row gap-6">
        <AvatarCard
          user={user}
          onAvatarUpload={handleAvatarUpload}
          isUploading={isUploading}
        />

        <div className="flex-1 space-y-6">
          <UserBioDetails user={user} onFieldUpdate={handleFieldUpdate} />
          <SocialMediaList
            socialMedia={user.socialMedia || []}
            onAdd={handleAddSocial}
            onDelete={handleDeleteSocial}
            onUpdate={handleAddSocial}
          />
        </div>
      </div>

      <div className="text-center">

          <button
    onClick={() => navigate("/admin")}
    className="flex items-center font-medium text-[#26A4FF] hover:underline text-xl"
  >
    Back to Admin Management
    <svg
      className="ml-1 h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
      </div>
    </div>
    </motion.div>
  );
};

export default UserEditPage;
