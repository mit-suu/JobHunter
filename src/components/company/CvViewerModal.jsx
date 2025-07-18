import { motion } from 'framer-motion';
import { HiXMark } from 'react-icons/hi2';

function CvViewerModal({ cvUrl, onClose }) {
  // Vì chúng ta chỉ hiển thị một ảnh duy nhất, không cần state cho số trang hay trang hiện tại.
  // Toàn bộ logic của react-pdf và phân trang đã được gỡ bỏ.

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 30 }}
        className="relative flex h-full w-full max-w-4xl flex-col rounded-xl bg-slate-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-600 p-4">
          <h3 className="text-lg font-semibold text-white">CV Preview</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <HiXMark className="h-6 w-6" />
          </button>
        </div>

        {/* Image Content */}
        <div className="flex flex-grow items-center justify-center overflow-auto p-4">
          {/* Thay thế Document và Page bằng một thẻ <img> đơn giản.
            - src trỏ trực tiếp đến cvUrl (đường dẫn ảnh PNG).
            - overflow-auto ở div cha sẽ tự động xử lý việc cuộn khi ảnh quá lớn.
          */}
          <img
            src={cvUrl}
            alt="CV Preview"
            className="max-w-full h-auto rounded-md"
          />
        </div>

        {/* Footer với chức năng phân trang đã được gỡ bỏ hoàn toàn
          vì không còn cần thiết khi hiển thị một ảnh duy nhất.
        */}
      </motion.div>
    </motion.div>
  );
}

export default CvViewerModal;