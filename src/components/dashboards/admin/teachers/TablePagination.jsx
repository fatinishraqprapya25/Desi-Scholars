import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const TablePagination = ({ currentPage, totalPages, filteredLength, indexOfFirst, indexOfLast, paginate }) => {
    if (totalPages <= 1 && filteredLength === 0) return null; 

    return (
        <div className="mt-5 flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-600 gap-3">
            <span>
                Showing {indexOfFirst + 1}-{Math.min(indexOfLast, filteredLength)} of {filteredLength}
            </span>
            <div className="flex items-center gap-1 sm:gap-1.5">
                <button onClick={() => paginate(1)} disabled={currentPage === 1} className="p-1.5 sm:p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronsLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} className="p-1.5 sm:p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>

                <span className="px-2 sm:px-3 py-1 border border-gray-300 rounded-md bg-gray-50">
                    Page {currentPage} of {totalPages}
                </span>

                <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} className="p-1.5 sm:p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
                <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} className="p-1.5 sm:p-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ChevronsRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </button>
            </div>
        </div>
    );
};

export default TablePagination;