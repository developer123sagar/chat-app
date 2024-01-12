export const calculateTime = (date: Date): string => {
    const inputDate = new Date(date);
    // getting current date
    const currentDate = new Date();

    // setup date formats
    const timeFormat: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "numeric" };
    const dateFormat: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };

    // check if it's today, tomorrow, or more than one day ago
    if (
        inputDate.getUTCDate() === currentDate.getUTCDate() &&
        inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
        inputDate.getUTCFullYear() === currentDate.getFullYear()
    ) {
        // if today then convert to AM/PM format
        const ampmtime = inputDate.toLocaleTimeString("en-US", timeFormat);
        return ampmtime;
    } else if (
        // if yesterday then show Yesterday
        inputDate.getUTCDate() === currentDate.getUTCDate() - 1 &&
        inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
        inputDate.getFullYear() === currentDate.getUTCFullYear()
    ) {
        return "Yesterday";
    } else if (
        Math.floor((currentDate.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24)) > 1 &&
        Math.floor((currentDate.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24)) <= 7
    ) {
        const timeDifference = Math.floor(
            (currentDate.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24)
        );
        const targetDate = new Date();
        targetDate.setDate(currentDate.getDate() - timeDifference);

        const daysOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const targetDay = daysOfWeek[targetDate.getDay()];

        return targetDay;
    } else {
        // more than 7 days ago: show date in DD/MM/YYYY format
        const formattedDate = inputDate.toLocaleDateString("en-GB", dateFormat);
        return formattedDate;
    }
};
