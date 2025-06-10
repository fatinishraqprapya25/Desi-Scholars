import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const SubmitTestButton = () => {
    return (
        <motion.button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 shadow-lg font-bold text-lg mt-8"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <Send className="h-6 w-6 mr-3" /> Create Test
        </motion.button>
    );
};

export default SubmitTestButton;