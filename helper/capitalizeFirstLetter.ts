export const capitalizeFirstLetter = (name: string) => {
    return name.replace(/\b\w/g, (match) => match.toUpperCase());
};
