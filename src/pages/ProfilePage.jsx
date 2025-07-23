import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getUsers, updateUser } from "../services/userService";
import { syncProfileWithCV } from "../services/aiService";

// Import các component con
import AvatarCard from "../components/profile/AvatarCard";
import UserBioDetails from "../components/profile/UserBioDetails";
import SocialMediaList from "../components/profile/SocialMediaList";
import SkillsCard from "../components/profile/SkillsCard";
import CvManager from "../components/profile/CvManager";
import SkillSuggestionModal from "../components/profile/SkillSuggestionModal";
import { HiArrowPath } from "react-icons/hi2";

// Cấu hình Cloudinary từ biến môi trường
const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME; 
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

function ProfilePage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [isUploading, setIsUploading] = useState(false); // Dành cho avatar
    const [isSyncing, setIsSyncing] = useState(false); // Dành cho CV
    const [suggestedSkills, setSuggestedSkills] = useState([]);
    const [isSuggestionModalOpen, setIsSuggestionModalOpen] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const users = await getUsers();
                const foundUser = users.find((u) => u.id === id);
                setUser(foundUser);
            } catch (error) {
                console.error("Failed to fetch user:", error);
            }
        };
        fetchUser();
    }, [id]);

    const handleFieldUpdate = async (field, value) => {
        try {
            const updated = await updateUser(id, { [field]: value });
            setUser((prev) => ({ ...prev, ...updated }));
        } catch (error) {
            console.error(`Failed to update field ${field}:`, error);
        }
    };

    const handleAvatarUpload = async (file) => {
        if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
            alert("Vui lòng cấu hình Cloudinary trong file .env");
            return;
        }
        
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                { method: "POST", body: formData }
            );
            const data = await response.json();
            
            if (data.secure_url) {
                await handleFieldUpdate('avatar', data.secure_url);
            } else {
                throw new Error("Upload failed");
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("Upload ảnh thất bại!");
        } finally {
            setIsUploading(false);
        }
    };

    const handleCvUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsSyncing(true);
        try {
            // 1. Gọi AI service để upload và phân tích CV
            const extractedData = await syncProfileWithCV(file);

            // 2. Cập nhật danh sách CV của user
            const newCv = { name: file.name, url: extractedData.cvUrl };
            const updatedCvs = [...(user.cvs || []), newCv];
            await updateUser(id, { cvs: updatedCvs });
            
            // 3. Mở modal gợi ý kỹ năng
            setSuggestedSkills(extractedData.skills);
            setIsSuggestionModalOpen(true);
            
            // Cập nhật lại state user để hiển thị CV mới ngay lập tức
            setUser(prev => ({...prev, cvs: updatedCvs}));

        } catch (error) {
            alert(`Failed to sync with CV: ${error.message}`);
        } finally {
            setIsSyncing(false);
        }
    };
    
    const handleAddSuggestedSkills = (skillsToAdd) => {
        const currentSkills = user.skills || [];
        // Kết hợp và loại bỏ trùng lặp
        const newSkillSet = new Set([...currentSkills, ...skillsToAdd]);
        handleFieldUpdate('skills', Array.from(newSkillSet));
    };

    if (!user) return <div className="text-center p-10">Loading...</div>;

    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="min-h-screen bg-white px-4 py-16 text-[#25324B] dark:bg-[#202430] sm:px-8 md:px-16 lg:px-24 xl:px-60">
                    <h1 className="font-poppins text-5xl font-bold dark:text-white">Profile</h1>
                    <p className="mb-8 text-gray-500">View and edit your profile details here.</p>

                    <div className="flex flex-col gap-8 md:flex-row">
                        <AvatarCard user={user} onAvatarUpload={handleAvatarUpload} isUploading={isUploading} />
                        <UserBioDetails user={user} onFieldUpdate={handleFieldUpdate} />
                    </div>
                    
                    <SkillsCard skills={user.skills} onFieldUpdate={handleFieldUpdate} />
                    <CvManager cvs={user.cvs} onCvUpload={handleCvUpload} isSyncing={isSyncing} />
                    <SocialMediaList socialMedia={user.socialMedia} onFieldUpdate={handleFieldUpdate} />
                </div>
            </motion.div>

            <AnimatePresence>
                {isSuggestionModalOpen && (
                    <SkillSuggestionModal
                        currentSkills={user.skills || []}
                        suggestedSkills={suggestedSkills}
                        onClose={() => setIsSuggestionModalOpen(false)}
                        onAddSkills={handleAddSuggestedSkills}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default ProfilePage;
