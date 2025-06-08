import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const chartVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 80,
            damping: 10,
            delay: 0.3 // A slight delay after summary cards
        }
    }
};

function MonthlyEarningsChart({ data }) {
    return (
        <motion.section
            className="mt-12 bg-white rounded-xl shadow-md p-6 border border-gray-100"
            variants={chartVariants}
            initial="hidden"
            animate="visible"
        >
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="mr-2 h-6 w-6 text-purple-600" /> Monthly Earnings Trend
            </h3>
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{
                            top: 15, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" tickFormatter={(value) => `$${value}`} />
                        <Tooltip
                            formatter={(value) => `$${value.toLocaleString()}`}
                            labelFormatter={(label) => `Month: ${label}`}
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                            }}
                            labelStyle={{ fontWeight: 'bold', color: '#333' }}
                            itemStyle={{ color: '#4CAF50' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        <Line
                            type="monotone"
                            dataKey="earnings"
                            stroke="#8884d8"
                            strokeWidth={3}
                            activeDot={{ r: 8 }}
                            name="Total Earnings"
                            dot={{ stroke: '#8884d8', strokeWidth: 2, r: 4 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.section>
    );
}

export default MonthlyEarningsChart;