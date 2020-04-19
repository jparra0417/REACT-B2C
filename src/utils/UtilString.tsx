export class UtilString {
  public static generateUID(): string {
    return (
      Math.random().toString(36).substr(2, 9) +
      Math.random().toString(36).substr(2, 9)
    );
  }

  public static printNumber(value: number, locale: string): string {
    return value
      ? value.toLocaleString(locale, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })
      : "0.0";
  }
}

export default UtilString;
