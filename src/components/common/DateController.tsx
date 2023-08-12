export default class DateController{

  private static days: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  private static months: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  public static UTCDateToFullString(date: Date): string {
    let str = this.days[date.getDay()] +" "+ date.getDate() +" "+ this.months[date.getMonth()] +" "+ date.getFullYear() +" à "+ this.withZero(date.getHours())+":"+ this.withZero(date.getMinutes());
    return str;
  }
  public static UTCDateToString(date: Date): string {
    let str = this.withZero(date.getDate()) +"/"+ this.withZero(date.getMonth()) +"/"+ date.getFullYear() +" à "+ this.withZero(date.getHours())+":"+ this.withZero(date.getMinutes());
    return str;
  }
  private static withZero(n: number): string {
    return n < 10 ? '0'+n : ''+n;
  }

  public static stringToDate() {
    //TODO
  }
  public static dateToString() {
    //TODO
  }
}