type __GetResult = [string, number] | undefined

export class Sheet {
  protected sheet: GoogleAppsScript.Spreadsheet.Sheet
  public appUrl: string

  public constructor(appUrl: string, sheetName: string) {
    const temp = SpreadsheetApp
      .openByUrl(appUrl)
      .getSheetByName(sheetName);
    if (temp === null) {
      throw TypeError(`sheetName "${sheetName}" is not found`);
    }
    this.sheet = temp!;
  }

  protected __get(key: string, values: (string | any)[][]): __GetResult {
    // let index: number | null = null
    // const t = values.find((v, i) => { index = i; v[0] == key });

    for (let i = 0; i < values.length; i++) {
      const v = values[i];
      if (v[0] === key) { return [v[1], i] }
    }

    return undefined
  }

  public get(key: string): string | undefined {
    const lastRow = this.sheet.getLastRow()
    const range = this.sheet.getRange(1, 1, lastRow, 2);

    const res: __GetResult = this.__get(key, range.getValues());

    if (res === undefined) {
      return (res as any)[0] as string
    }


    return undefined
  }
 
  public put(key: string, value: any) {
    const lastRow = this.sheet.getLastRow()
    const range = this.sheet.getRange(1, 1, lastRow, 2);
    const indexTemp = this.__get(key, range.getValues());
    if (indexTemp === undefined) {
      this.sheet.getRange(lastRow, 1, 1, 2).setValues([[key, value]]);
    } else {
      this.sheet.getRange((indexTemp as any)[1], 1, 1, 2).setValues([[key, value]]);
    }
  }
}