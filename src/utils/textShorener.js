function textShortener(text, maxLength = 100) {
    if (!text) return '';
    if (text.length <= maxLength) return text;

    // Trim without cutting a word in half
    const trimmed = text.substr(0, maxLength);
    const lastSpace = trimmed.lastIndexOf(' ');
    return trimmed.substr(0, lastSpace) + '...';
}

export default textShortener;