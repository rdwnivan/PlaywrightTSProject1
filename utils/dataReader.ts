import path from 'path';
import { readCSV } from '../utils/csvReader';
import { readExcel } from '../utils/excelReader';
import fs from 'fs';

// Generic function to read test data from CSV, Excel, or JSON files.
// It checks the file extension and calls the appropriate reader.
export function readData(filepath: string, sheetName?: string) {

    // Get the file extension and normalize it to lowercase.
    const ext = path.extname(filepath).toLowerCase();

    // Handle different file types based on the extension.
    switch (ext) {
        case '.csv':
            // Read data from a CSV file using the CSV helper.
            console.log('Reading CSV file:', filepath);
            return readCSV(filepath);

        case '.xlsx':
            // Read data from an Excel file using the Excel helper.
            // If no sheet name is provided, default to 'Sheet1'.
            console.log('Reading Excel file:', filepath, 'Sheet:', sheetName);
            return readExcel(filepath, sheetName || 'Sheet1');

        case '.json': {
            // Read JSON content from disk and parse it into a JavaScript object.
            console.log('Reading JSON file:', filepath);
            const JSONdata = fs.readFileSync(filepath, 'utf8');
            return JSON.parse(JSONdata);
        }

        default:
            // Throw an error if the file type is not supported.
            throw new Error(`Unsupported file extension: ${ext}`);
    }
}