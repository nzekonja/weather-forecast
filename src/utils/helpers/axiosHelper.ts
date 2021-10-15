class AxiosHelper {
  parseAxiosInstanceResponse(res: any): any {
    const responseStringified: string = res as string;
    return JSON.parse(responseStringified);
  }
}

export default new AxiosHelper();
