import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineDocumentArrowUp, HiArrowPath, HiOutlineEye, HiOutlineTrash } from 'react-icons/hi2';
import CvViewerModal from '../company/CvViewerModal'; 

// Component nhỏ để hiển thị một CV preview
const CvItem = ({ cv, onView, onDelete }) => {
    const getThumbnailUrl = (url) => {
        if (!url) return "";
        const lastDotIndex = url.lastIndexOf('.');
        if (lastDotIndex === -1) return url;
        return url.substring(0, lastDotIndex) + '.jpg';
    };

    const thumbnailUrl = getThumbnailUrl(cv.url);

    return (
        //<=====BẮT ĐẦU SỬA======>
        // Bỏ onClick khỏi div cha
        <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="group relative overflow-hidden rounded-lg border border-slate-200 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 dark:border-slate-700"
        >
            <img 
                src={thumbnailUrl} 
                alt={`Preview of ${cv.name}`} 
                className="h-48 w-full object-cover object-top"
                onError={(e) => { e.target.src = 'https://placehold.co/300x400/e2e8f0/334155?text=CV'; }}
            />
            {/* Lớp phủ khi hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                {/* Chuyển onClick vào một nút bấm rõ ràng */}
                <button 
                    onClick={() => onView(cv.url)} 
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-transform hover:scale-110"
                >
                    <HiOutlineEye className="h-8 w-8" />
                </button>
            </div>
            {/* Tên file */}
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="truncate text-sm font-semibold text-white">{cv.name || 'Untitled CV'}</p>
            </div>
        </motion.div>
        //<=====KẾT THÚC SỬA======>
    );
};


function CvManager({ cvs = [], onCvUpload, isSyncing, onFieldUpdate }) {
    const [viewingCvUrl, setViewingCvUrl] = useState(null);

    return (
        <>
            <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">My CVs</h3>
                <p className="mt-1 text-sm text-gray-500">Manage your uploaded CVs here. Click on a CV to view it in full.</p>
                
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                    {cvs.map((cv, index) => (
                        <CvItem 
                            key={index} 
                            cv={cv} 
                            onView={setViewingCvUrl}
                        />
                    ))}
                </div>

                {cvs.length === 0 && <p className="mt-4 text-sm text-center text-gray-400 py-8">You haven't uploaded any CVs yet.</p>}

                <div className="mt-6 border-t pt-4 dark:border-gray-600">
                    <label htmlFor="cv-upload" className={`inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-600 dark:text-gray-300 ${isSyncing && 'cursor-not-allowed opacity-50'}`}>
                        {isSyncing ? (
                            <>
                                <HiArrowPath className="h-5 w-5 animate-spin" />
                                Uploading & Syncing...
                            </>
                        ) : (
                            <>
                                <HiOutlineDocumentArrowUp className="h-5 w-5" />
                                Upload New CV & Sync Skills
                            </>
                        )}
                    </label>
                    <input id="cv-upload" type="file" className="hidden" accept=".pdf" onChange={onCvUpload} disabled={isSyncing} />
                </div>
            </div>

            {/* Modal để xem CV toàn màn hình */}
            <AnimatePresence>
                {viewingCvUrl && (
                    <CvViewerModal
                        cvUrl={viewingCvUrl}
                        onClose={() => setViewingCvUrl(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default CvManager;
