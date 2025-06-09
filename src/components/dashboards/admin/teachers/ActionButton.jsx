const ActionButton = ({ onClick, icon: Icon, children, variant = 'primary' }) => {
    const baseClasses = "w-full sm:w-auto flex items-center justify-center px-3 sm:px-4 py-2 rounded-lg transition-colors duration-200 font-medium text-xs sm:text-sm";
    const primaryClasses = "bg-purple-600 text-white hover:bg-purple-700 shadow-md";
    const secondaryClasses = "bg-gray-200 text-gray-700 hover:bg-gray-300";

    const classes = `${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses}`;

    return (
        <button className={classes} onClick={onClick}>
            {Icon && <Icon className="h-4 w-4 mr-1.5 sm:mr-2" />} {children}
        </button>
    );
};

export default ActionButton;