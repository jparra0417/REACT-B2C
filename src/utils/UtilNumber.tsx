export class UtilNumber {
  public static setPrecision(value: number): number {
    return value ? parseFloat(value.toFixed(2)) : value;
  }
}

export default UtilNumber;
