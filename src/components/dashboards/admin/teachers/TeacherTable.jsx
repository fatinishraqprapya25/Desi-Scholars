import TableHead from './TableHead';
import TableBody from './TableBody';

const TeacherTable = ({
    teachers,
    sortConfig,
    requestSort,
    handleEdit,
    handleDelete,
    handleViewDetails,
    columns
}) => {
    if (teachers.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 text-sm sm:text-base">
                No teachers found matching your criteria.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto min-h-[300px] w-full">
            <table className="min-w-full divide-y divide-gray-200 table-auto">
                <TableHead columns={columns} sortConfig={sortConfig} requestSort={requestSort} />
                <TableBody
                    teachers={teachers}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleViewDetails={handleViewDetails}
                />
            </table>
        </div>
    );
};

export default TeacherTable;