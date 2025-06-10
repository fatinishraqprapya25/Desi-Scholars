// Framer Motion variants
export const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
};

export const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
};

// Mock data for practice tests
export const practiceTestsData = [
    {
        id: 'PT-001',
        title: 'React Fundamentals Quiz',
        description: 'A comprehensive quiz covering basic React concepts, JSX, components, and state management.',
        status: 'Published',
        totalQuestions: 25,
        durationMinutes: 30, // Example duration
        lastModified: '2025-05-29',
        createdBy: 'Dr. Emily White'
    },
    {
        id: 'PT-002',
        title: 'Advanced JavaScript Concepts',
        description: 'Test your knowledge on asynchronous JS, closures, prototypes, and advanced array methods.',
        status: 'Draft',
        totalQuestions: 40,
        durationMinutes: 2, // Example duration closer to 2 minutes
        lastModified: '2025-06-03',
        createdBy: 'Prof. David Lee'
    },
    {
        id: 'PT-003',
        title: 'SQL Database Essentials',
        description: 'Assess your understanding of SQL queries, database design, and normalization.',
        status: 'Published',
        totalQuestions: 30,
        durationMinutes: 45,
        lastModified: '2025-05-20',
        createdBy: 'Ms. Laura Davis'
    },
    {
        id: 'PT-004',
        title: 'Cybersecurity Basics Assessment',
        description: 'An introductory assessment on common cyber threats, security principles, and best practices.',
        status: 'Archived',
        totalQuestions: 20,
        durationMinutes: 2, // Example duration closer to 2 minutes
        lastModified: '2025-04-10',
        createdBy: 'Dr. Nancy Wilson'
    },
];