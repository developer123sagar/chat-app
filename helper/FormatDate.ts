function isDate(value: string | number | Date): value is Date {
    return value instanceof Date;
}

export const formatDate = (date: Date): string => {
    if (isDate(date)) {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        return date.toLocaleDateString(undefined, options);
    } else if (typeof date === "string") {
        const parsedDate = new Date(date);

        if (!isNaN(parsedDate.getTime())) {
            const options: Intl.DateTimeFormatOptions = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };
            return parsedDate.toLocaleDateString(undefined, options);
        }
    }

    return "";
};