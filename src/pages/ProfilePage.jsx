import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { getUsers, updateUser } from "../services/userService";
import AvatarCard from "../components/profile/AvatarCard";
import UserBioDetails from "../components/profile/UserBioDetails";
import SocialMediaList from "../components/profile/SocialMediaList";


const CLOUDINARY_CLOUD_NAME = "dxhme9fag"; 
const CLOUDINARY_UPLOAD_PRESET = "Assignment";



function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [isUploading, setIsUploading] = useState(false); 

  useEffect(() => {
    const fetchUser = async () => {
      const users = await getUsers();
      const found = users.find((u) => u.id === id);
      setUser(found);
    };
    fetchUser();
  }, [id]);

  const onUpdateAvatar = async (newUrl) => {
    const updatedUser = await updateUser(user.id, { avatar: newUrl });
    setUser((prev) => ({ ...prev, avatar: updatedUser.avatar }));
  };
  const handleAvatarUpload = async (file) => {
    if (!CLOUDINARY_CLOUD_NAME || CLOUDINARY_CLOUD_NAME === "YOUR_CLOUD_NAME") {
      alert("Vui lòng cấu hình CLOUDINARY_CLOUD_NAME trong file ProfilePage.jsx");
      return;
    }
    
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      
      await onUpdateAvatar(data.secure_url);

    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Upload ảnh thất bại!");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFieldUpdate = async (field, value) => {
    const updated = await updateUser(id, { [field]: value });
    setUser((prev) => ({ ...prev, [field]: updated[field] }));
  };

  if (!user) return <div className="text-center p-10">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="min-h-screen bg-white px-4 py-16 text-[#25324B] dark:bg-[#202430] sm:px-8 md:px-16 lg:px-24 xl:px-60">
        <h1 className="font-poppins text-5xl font-bold dark:text-white">Profile</h1>
        <p className="mb-8 text-gray-500">
          View and edit your profile details here.
        </p>

        <div className="flex flex-col gap-8 md:flex-row">
          <AvatarCard
            user={user}
            onAvatarUpload={handleAvatarUpload}
            isUploading={isUploading}
          />
          <UserBioDetails user={user} onFieldUpdate={handleFieldUpdate} />
        </div>

        <SocialMediaList
          socialMedia={user.socialMedia}
        />
      </div>
    </motion.div>
  );
}

export default ProfilePage;