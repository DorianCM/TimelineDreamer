export default class DreamerDate {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;

  constructor(year: number, month: number = 0, day: number = 0, hour: number = 0, minute: number = 0, second: number = 0) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  public toString(): string {
    return this.year+"/"+this.month+"/"+this.day+"/"+this.hour+"/"+this.minute+"/"+this.second;
  }

  public isBetween(min: DreamerDate, max: DreamerDate): boolean {
    let isBetween = true;

    if(DreamerDate.compareDate(min, this) > 0 )
      isBetween = false
    else if(DreamerDate.compareDate(this, max) > 0)
      isBetween = false

    return isBetween;
  }
  public isEqual(other: DreamerDate): boolean {
    return this.year === other.year
    && this.month === other.month
    && this.day === other.day
    && this.hour === other.hour
    && this.minute === other.minute
    && this.second === other.second;
  }

  public static fromString(str: string): DreamerDate {
    const values: string[] = str.split('/');
    if(values.length < 6)
      return new DreamerDate(0);

    const year: number = +values[0];
    const month: number = +values[1];
    const day: number = +values[2];
    const hour: number = +values[3];
    const minute: number = +values[4];
    const second: number = +values[5];
    return new DreamerDate(year, month, day, hour, minute, second);
  }

  public static compareDate(left: DreamerDate, right: DreamerDate): number {
    if (left.year < right.year)
      return -1;
    else if (left.year > right.year)
      return 1;
    if (left.month < right.month)
      return -1;
    else if (left.month > right.month)
      return 1;
    if (left.day < right.day)
      return -1;
    else if (left.day > right.day)
      return 1;
    if (left.hour < right.hour)
      return -1;
    else if (left.hour > right.hour)
      return 1;
    if (left.minute < right.minute)
      return -1;
    else if (left.minute > right.minute)
      return 1;
    if (left.second < right.second)
      return -1;
    else if (left.second > right.second)
      return 1;
    return 0;
  }
}

// const monthMap = new Map<number, string>([
//   [1, "Janvier"],
//   [2, "Février"],
//   [3, "Mars"],
//   [4, "Avril"],
//   [5, "Mai"],
//   [6, "Juin"],
//   [7, "Juillet"],
//   [8, "Août"],
//   [9, "Septembre"],
//   [10, "Octobre"],
//   [11, "Novembre"],
//   [12, "Décembre"],
// ]);

