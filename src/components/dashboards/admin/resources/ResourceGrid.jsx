import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb } from "lucide-react";
import ResourceCard from "./ResourceCard";

function ResourceGrid({ resources, onEditResource, deleteResource }) {
    if (resources.length === 0) {
        return (
            <div className="text-center py-10 text-gray-500 text-base">
                <Lightbulb className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No resources found</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Adjust your search or add a new resource!
                </p>
            </div>
        );
    }

    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.1
                    }
                }
            }}
        >
            <AnimatePresence>
                {resources.map((resource) => (
                    <ResourceCard
                        deleteResource={deleteResource}
                        key={resource.id}
                        resource={resource}
                        onEditResource={onEditResource}
                    />
                ))}
            </AnimatePresence>
        </motion.div>
    );
}

export default ResourceGrid;