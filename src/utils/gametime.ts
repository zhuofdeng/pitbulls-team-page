import { parseISO } from 'date-fns';

type Game = {
    date: string; // e.g. "2024-06-10"
    time: string; // e.g. "6:00 PM"
};

export const getGameDateTime = (game: Game) => {
    const [time, modifier] = game.time.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    // Create a Date object in EST (UTC-5, or UTC-4 during daylight saving)
    // Assume Eastern Time is always UTC-4 for summer (June)
    const dateStr = `${game.date}T${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}:00-04:00`;
    return parseISO(dateStr);
}