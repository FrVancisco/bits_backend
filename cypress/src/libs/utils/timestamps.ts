export function currentTimeHHMMSS(): string {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return hours + minutes + seconds;
}

export function getRandomDateOfBirth(): string {
    const startYear: number = 1900;
    const endYear: number = new Date().getFullYear();

    const randomYear: number = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
    const randomMonth: number = Math.floor(Math.random() * 12) + 1;
    const randomDay: number  = Math.floor(Math.random() * new Date(randomYear, randomMonth, 0).getDate()) + 1;

    const year: string = randomYear.toString().padStart(4, '0');
    const month: string = randomMonth.toString().padStart(2, '0');
    const day: string = randomDay.toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}