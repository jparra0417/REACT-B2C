export class UtilDate {
  public static printDateByTimestamp(
    milliseconds: number,
    locale: string
  ): string {
    return new Date(milliseconds).toLocaleString(locale);
  }
}

export default UtilDate;
