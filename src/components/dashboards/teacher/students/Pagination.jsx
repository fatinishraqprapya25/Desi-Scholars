import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export default function Pagination({
    currentPage,
    totalPages,
    paginate,
    totalItems,
    itemsPerPage,
    indexOfFirstItem,
    indexOfLastItem
}) {
    return (
        <div className="mt-5 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-600 gap-3">
            <span>Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems}</span>
            <div className="flex items-center gap-1 sm:gap-1.5">
                <button onClick={() => paginate(1)} disabled={currentPage === 1} className="p-1.5 sm:p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronsLeft className="h-3.5 w-3.5 sm:h-4" /></button>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-1.5 sm:p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronLeft className="h-3.5 w-3.5 sm:h-4" /></button>
                <span className="px-2 sm:px-3 py-1 sm:py-1.5 border rounded-md bg-gray-50 text-xs sm:text-sm">Page {currentPage} of {totalPages}</span>
                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="p-1.5 sm:p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronRight className="h-3.5 w-3.5 sm:h-4" /></button>
                <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} className="p-1.5 sm:p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50"><ChevronsRight className="h-3.5 w-3.5 sm:h-4" /></button>
            </div>
        </div>
    );
}