    import { useState } from 'react';
    import { motion } from 'framer-motion';
    import { Document, Page, pdfjs } from 'react-pdf';

    // Import CSS cần thiết cho react-pdf
    import 'react-pdf/dist/Page/AnnotationLayer.css';
    import 'react-pdf/dist/Page/TextLayer.css';

    import { HiXMark, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

    // <=====BẮT ĐẦU SỬA======>
    // Sửa lại tên file worker cho đúng với file có trong node_modules (đuôi .mjs)
    pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;
    // <=====KẾT THÚC SỬA======>

    function CvViewerModal({ cvUrl, onClose }) {
        const [numPages, setNumPages] = useState(null);
        const [pageNumber, setPageNumber] = useState(1);

        function onDocumentLoadSuccess({ numPages }) {
            setNumPages(numPages);
        }

        const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
        const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));

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
                        <h3 className="text-lg font-semibold text-white">CV Viewer</h3>
                        <button onClick={onClose} className="text-slate-400 hover:text-white">
                            <HiXMark className="h-6 w-6" />
                        </button>
                    </div>

                    {/* PDF Content */}
                    <div className="flex-grow overflow-auto p-4">
                        <Document
                            file={cvUrl}
                            onLoadSuccess={onDocumentLoadSuccess}
                            loading={<div className="text-center text-white">Loading CV...</div>}
                            error={<div className="text-center text-red-400">Failed to load CV. Please ensure the link is correct and accessible.</div>}
                        >
                            <Page 
                                pageNumber={pageNumber}
                                renderAnnotationLayer={false}
                                renderTextLayer={false}
                            />
                        </Document>
                    </div>

                    {/* Footer with Pagination */}
                    {numPages && numPages > 1 && (
                        <div className="flex flex-shrink-0 items-center justify-center gap-4 border-t border-slate-600 p-4">
                            <button onClick={goToPrevPage} disabled={pageNumber <= 1} className="rounded-full p-2 text-white disabled:opacity-50 hover:bg-slate-700">
                                <HiChevronLeft className="h-6 w-6" />
                            </button>
                            <p className="font-medium text-white">
                                Page {pageNumber} of {numPages}
                            </p>
                            <button onClick={goToNextPage} disabled={pageNumber >= numPages} className="rounded-full p-2 text-white disabled:opacity-50 hover:bg-slate-700">
                                <HiChevronRight className="h-6 w-6" />
                            </button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        );
    }

    export default CvViewerModal;
 