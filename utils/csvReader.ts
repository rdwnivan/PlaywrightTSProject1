import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

/**
 * Read a CSV file and return typed rows.
 *
 * @param filePath - Relative or absolute path to the CSV file.
 * @returns An array of parsed rows typed as T.
 */
export function readCSV<T = Record<string, unknown>>(filePath: string): T[] {
    // Resolve the file path relative to this utility file when a relative path is provided.
    const resolvedPath = path.isAbsolute(filePath)
        ? filePath
        : path.resolve(__dirname, filePath);

    // Read the CSV file contents as UTF-8 text.
    const fileContent = fs.readFileSync(resolvedPath, 'utf8');

    // Parse the CSV content into objects, using the first row as column keys.
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        cast: (value, context) => {
            // Convert the `run` column values from strings to booleans.
            if (context.column === 'run') {
                return value === 'true';
            }
            // Leave other values as strings.
            return value;
        },
    }) as T[];

    return records;
}
