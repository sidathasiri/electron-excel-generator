import writeXlsxFile from "write-excel-file/node";
import fs from "fs";
import readXlsxFile from "read-excel-file/node";
import { dialog } from "electron";

const schema = [
  {
    column: "Customer ID",
    type: String,
    value: (row) => row.customerId,
  },
  {
    column: "Description",
    type: String,
    value: (row) => row.description,
  },
  {
    column: "Date",
    type: String,
    value: (row) => row.date,
  },
];

let filePath;

export const writeToExcelFile = async (record) => {
  try {
    if (!filePath) {
      const result = await dialog.showSaveDialog({
        title: "Save or Update Excel File",
        defaultPath: "Customers.xlsx",
        filters: [{ name: "Excel Files", extensions: ["xlsx"] }],
      });

      filePath = result.filePath;
    }

    if (!filePath) return { success: false, message: "File save canceled" };

    let existingData = [];

    // Check if file exists
    if (fs.existsSync(filePath)) {
      // Read the existing file data
      const rows = await readXlsxFile(filePath);
      existingData = rows.map((row) => ({
        customerId: row[0], // Assuming columns match schema
        description: row[1],
        date: row[2],
      }));
      existingData.shift();
    }

    // Append the new record
    existingData.push(record);

    await writeXlsxFile(existingData, {
      schema,
      filePath,
    });

    return { success: true, message: "Record saved successfully!" };
  } catch (error) {
    console.log("error:", error);
    return { success: false, message: error.message };
  }
};
