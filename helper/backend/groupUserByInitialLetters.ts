export function groupUsersByInitialLetters(users: any[]) {
    const groupedUsers: { [initialLetter: string]: any[] } = {};

    users.forEach((user: { username: string; _id: string; email: string; avatar: string; about: string; }) => {
        const initialLetter = user.username.charAt(0).toUpperCase();

        if (!groupedUsers[initialLetter]) {
            groupedUsers[initialLetter] = [];
        }

        groupedUsers[initialLetter].push({
            _id: user._id,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
            about: user.about
        });
    });
    return groupedUsers;
}
