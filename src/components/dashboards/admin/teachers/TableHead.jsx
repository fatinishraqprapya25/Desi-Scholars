import { ArrowDownUp } from 'lucide-react';

const TableHead = ({ columns, sortConfig, requestSort }) => {
    const getClassNamesFor = (key) => {
        if (!sortConfig.key) {
            return;
        }
        return sortConfig.key === key ? sortConfig.direction : undefined;
    };

    return (
        <thead className="bg-gray-50">
            <tr>
                {columns.map((column) => (
                    <th
                        key={column.key}
                        scope="col"
                        className={`px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${column.sortable ? 'cursor-pointer hover:bg-gray-100' : ''} ${column.className || ''}`}
                        onClick={column.sortable ? () => requestSort(column.key) : undefined}
                    >
                        {column.label}
                        {column.sortable && (
                            getClassNamesFor(column.key) ? (
                                getClassNamesFor(column.key) === 'ascending' ? ' ↑' : ' ↓'
                            ) : (
                                <ArrowDownUp className="inline-block h-3 w-3 ml-1 opacity-50" />
                            )
                        )}
                    </th>
                ))}
                <th scope="col" className="px-3 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider rounded-tr-lg">
                    Actions
                </th>
            </tr>
        </thead>
    );
};

export default TableHead;