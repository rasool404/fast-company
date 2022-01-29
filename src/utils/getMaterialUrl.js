export const getMaterialUrl = (url) => {
    if (!url) return;

    const clearString = url.indexOf('/', 1) + 1;
    return url.substr(clearString);
}