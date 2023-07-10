interface IDateProvider {
    compareInHours(start_date: Date, end_date: Date): number;
    convertToUTC(date: Date): string;
    dateNow(): Date;
    compareInDays(start_date: Date, end_date: Date): number;
    addDays(days: number): number;
    addHours(hours: number): number;
    compareIfBefore(start_date: Date, end_date: Date): boolean;
    isAfter(unixDate: number): boolean;
}

export { IDateProvider };
