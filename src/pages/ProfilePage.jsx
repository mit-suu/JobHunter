import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { getUsers, updateUser } from '../services/userService';
import AvatarCard from '../components/profile/AvatarCard';
import UserBioDetails from '../components/profile/UserBioDetails';
import SocialMediaList from '../components/profile/SocialMediaList';

function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const users = await getUsers();
      const found = users.find((u) => u.id === id);
      setUser(found);
    };
    fetchUser();
  }, [id]);

  const onUpdateAvatar = async (newUrl) => {
    const updated = await updateUser(user.id, { avatar: newUrl });
    setUser((prev) => ({ ...prev, avatar: updated.avatar }));
  };

  const handleFieldUpdate = async (field, value) => {
    const updated = await updateUser(id, { [field]: value });
    setUser((prev) => ({ ...prev, [field]: updated[field] }));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="min-h-screen px-60 py-16 bg-white text-[#25324B]">
        <h1 className="text-5xl font-poppins font-bold">Profile</h1>
        <p className="mb-8 text-gray-500">View all your profile details here.</p>

        <div className="flex gap-8">
          <AvatarCard user={user} onUpdateAvatar={onUpdateAvatar} />
          <UserBioDetails user={user} onFieldUpdate={handleFieldUpdate} />
        </div>

        <SocialMediaList
  socialMedia={user.socialMedia}
  onAdd={(newItem) => {
    const updated = [...(user.socialMedia || []), newItem];
    updateUser(user.id, { socialMedia: updated });
    setUser(prev => ({ ...prev, socialMedia: updated }));
  }}
  onDelete={(index) => {
    const updated = [...(user.socialMedia || [])];
    updated.splice(index, 1);
    updateUser(user.id, { socialMedia: updated });
    setUser(prev => ({ ...prev, socialMedia: updated }));
  }}
/>

      </div>
    </motion.div>
  );
}

export default ProfilePage;
