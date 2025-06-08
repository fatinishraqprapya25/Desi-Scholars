import { BookOpen, PlayCircle, Globe, Video, FileText, Code } from 'lucide-react';

function ResourceTypeIcon({ type }) {
    switch (type) {
        case 'Documentation':
            return <BookOpen className="h-4 w-4 mr-1 text-gray-500" />;
        case 'Interactive Courses':
            return <PlayCircle className="h-4 w-4 mr-1 text-gray-500" />;
        case 'Tutorial':
            return <FileText className="h-4 w-4 mr-1 text-gray-500" />;
        case 'Blog/Articles':
            return <Code className="h-4 w-4 mr-1 text-gray-500" />;
        case 'Video Tutorials':
            return <Video className="h-4 w-4 mr-1 text-gray-500" />;
        default:
            return <Globe className="h-4 w-4 mr-1 text-gray-500" />;
    }
}

export default ResourceTypeIcon;