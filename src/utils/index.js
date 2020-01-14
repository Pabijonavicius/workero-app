import React from "react";
import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import XLSX from "xlsx";

function transformHeaders(headers) {
  return headers.map(header => header.title);
}
function formatFooter(data, totalTime) {
  for (let i = 0; i < data.length; i++) {
    data[i] = "";
  }
  data[data.length - 1] = totalTime;
  data[data.length - 2] = "Total:";
  return data;
}
function transformData(headers, rows, totalTime) {
  let h = transformHeaders(headers);
  let data = [h];
  for (let i = 0; i < rows.length; i++) {
    data.push(Object.values(rows[i]));
  }
  data.push(formatFooter([...data[0]], totalTime));

  return data;
}
export const saveFile = async ({
  headers,
  data,
  documentName = "documentname",
  sheetName = "sheet",
  totalTime = 0
}) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
    var wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Worker submited work report",
      Subject: "Test",
      Author: "Workero",
      CreatedDate: new Date()
    };

    wb.SheetNames.push(sheetName);
    var ws_data = transformData(headers, data, totalTime);
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets[sheetName] = ws;

    var wbout = XLSX.write(wb, { bookType: "xlsx", type: "base64" });

    let fileUri = FileSystem.documentDirectory + `${documentName}.xlsx`;
    await FileSystem.writeAsStringAsync(fileUri, wbout, {
      encoding: FileSystem.EncodingType.Base64
    });
    const asset = await MediaLibrary.createAssetAsync(fileUri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
  }
};
