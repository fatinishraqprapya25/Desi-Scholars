// src/components/teachers/TableHead.jsx
import React from 'react';

const TableHead = ({ columns, sortConfig, requestSort }) => {
    return (
        <thead className="bg-gray-50">
            <tr>
                {columns.map(column => (
                    <th
                        key={column.key}
                        onClick={() => column.sortable && requestSort(column.key)}
                        className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer 
                            ${column.className || ''} 
                            ${column.sortable ? 'hover:bg-gray-100' : ''}`}
                    >
                        <div className="flex items-center">
                            {column.label}
                            {sortConfig.key === column.key && (
                                <span className="ml-1 text-gray-700">
                                    {sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}
                                </span>
                            )}
                        </div>
                    </th>
                ))}
                {/* Add a header for the Actions column, which is not in your `tableColumns` config */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                </th>
            </tr>
        </thead>
    );
};

export default TableHead;