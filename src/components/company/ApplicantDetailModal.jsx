import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiOutlineDocumentText, HiOutlineUser } from 'react-icons/hi2';
import { HiOutlineMail } from 'react-icons/hi';
import CvViewerModal from './CvViewerModal'; // Import component xem CV

function ApplicantDetailModal({ application, onClose }) {
    const [isCvViewerOpen, setIsCvViewerOpen] = useState(false); // State để quản lý việc mở/đóng trình xem CV

    if (!application) return null;

    const { user, coverLetter, cvUrl, appliedDate } = application;

    //<=====BẮT ĐẦU SỬA======>
    // Hàm xử lý khi ảnh đại diện bị lỗi
    const handleImageError = (e) => {
        // Nếu link avatar từ db.json bị lỗi, thay thế bằng ảnh placeholder
        e.target.onerror = null; // Ngăn vòng lặp vô hạn nếu placeholder cũng lỗi
        e.target.src = 'https://via.placeholder.com/80';
    };
    //<=====KẾT THÚC SỬA======>

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative w-full max-w-2xl rounded-xl bg-white p-8 shadow-2xl dark:bg-slate-800"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                        <HiXMark className="h-6 w-6" />
                    </button>

                    {/* Thông tin ứng viên */}
                    <div className="flex items-start gap-4">
                        {/* <=====BẮT ĐẦU SỬA======> */}
                        <img 
                            src={user?.avatar || 'https://via.placeholder.com/80'} 
                            alt={user?.username} 
                            onError={handleImageError} // Thêm trình xử lý lỗi vào đây
                            className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-md"
                        />
                        {/* <=====KẾT THÚC SỬA======> */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user?.username}</h2>
                            <div className="mt-1 flex flex-col gap-1 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:gap-4">
                                <span className="flex items-center gap-1.5"><HiOutlineMail /> {user?.email}</span>
                                <span className="flex items-center gap-1.5"><HiOutlineUser /> Applied on {new Date(appliedDate).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Thư giới thiệu */}
                    <div className="mt-8">
                        <h3 className="font-semibold text-slate-800 dark:text-white">Cover Letter</h3>
                        <div className="mt-2 max-h-48 overflow-y-auto rounded-lg border bg-slate-50 p-4 text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
                            <p className="whitespace-pre-wrap">{coverLetter || "No cover letter provided."}</p>
                        </div>
                    </div>

                    {/* Nút hành động */}
                    <div className="mt-8">
                        <button
                            onClick={() => setIsCvViewerOpen(true)}
                            className="flex w-full items-center justify-center gap-3 rounded-lg bg-blue-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
                        >
                            <HiOutlineDocumentText className="h-6 w-6" />
                            View CV
                        </button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Render trình xem CV */}
            <AnimatePresence>
                {isCvViewerOpen && (
                    <CvViewerModal
                        cvUrl={cvUrl}
                        onClose={() => setIsCvViewerOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default ApplicantDetailModal;
