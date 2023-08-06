export default class DateController{

  private static days: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  private static months: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  public static UTCDateToFullString(date: Date): string {
    let str = this.days[date.getDay()] +" "+ date.getDate() +" "+ this.months[date.getMonth()] +" "+ date.getFullYear() +" à "+ (date.getHours() < 10 ? "0"+date.getHours() : date.getHours())+":"+ (date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes());
    return str;
  }
  public static UTCDateToString(date: Date): string {
    let str = date.getDate() +"/"+ date.getMonth() +"/"+ date.getFullYear() +" à "+ (date.getHours() < 10 ? "0"+date.getHours() : date.getHours())+":"+ (date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes());
    return str;
  }

  public static stringToDate() {
    //TODO
  }
  public static dateToString() {
    //TODO
  }
}