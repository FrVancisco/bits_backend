export function getTitle(title?: string): string {
    const titles: string[] = ["Mr", "Mrs", "Miss", "Ms", "Mx"];

    if (title && titles.includes(title)) {
        return title;
    }

    const randomIndex: number = Math.floor(Math.random() * titles.length);
    return titles[randomIndex];
}

export function getStatusFromRating(rating: number): string {
    if (rating === 0) {
        return 'rejected';
    } else if (rating >= 5) {
        return 'active';
    } else {
        return 'new';
    }
}