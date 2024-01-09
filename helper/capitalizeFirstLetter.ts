export const capitalizeFirstLetter = (name: string) => {
    if (name)
        return name.replace(/\b\w/g, (match) => match.toUpperCase());
};
