import * as XLSX from 'xlsx';
import path from 'path';

// Define the shape of each row from the Excel file.
export type LoginData = {
    username: string;
    password: string;
    expected: string;
    run: string;
};

// Read data from an Excel file and return it as an array of LoginData objects.
export function readExcel(filepath: string, sheetName: string): LoginData[] {
    // Convert the given relative path into a full absolute path.
    const fullPath = path.resolve(filepath);
    console.log('full path is', fullPath);

    // Load the Excel workbook from the file.
    const workbook = XLSX.readFile(fullPath);

    // Get the target worksheet by its name.
    const sheet = workbook.Sheets[sheetName];

    // Convert the worksheet rows into JSON objects.
    const data = XLSX.utils.sheet_to_json<LoginData>(sheet);

    // Return the parsed rows with the expected type.
    return data as LoginData[];
}