class DateHelper {
  convertEpochToDate(epochDate: number): Date {
    return new Date(epochDate * 1000);
  }
}

export default new DateHelper();
