import { Sheet } from "./sheet";

const APP_ID = "";
const SHEET_NAME = ""

/* 
type GetResult = {
  result: string
}
*/

function doGet(e: GoogleAppsScript.Events.DoGet): GoogleAppsScript.Content.TextOutput {
  let output = ContentService.createTextOutput()
  output.setMimeType(ContentService.MimeType.JSON)

  const key: string | undefined = e.parameter.key
  if (key == undefined) {
    throw TypeError("key: undefined is not valid value")
  }

  const sheet = new Sheet(APP_ID, SHEET_NAME)
  const res = sheet.get(key as string)
  if (res == undefined) {
    throw TypeError(`key: ${key} is not found`)
  }

  output.setContent(JSON.stringify({ result: res as string }))
  return output;
}

function doPost(e: GoogleAppsScript.Events.DoPost) {
  let output = ContentService.createTextOutput()
  output.setMimeType(ContentService.MimeType.JSON)

  const data = JSON.parse(e.postData.contents)
  const key: string | undefined = data.key
  const value: string|undefined = data.value

  if(key == undefined || value == undefined){
    throw TypeError("key or value is not defined")
  }

  const sheet = new Sheet(APP_URL, SHEET_NAME)
  sheet.put(key as string, value as string);
}