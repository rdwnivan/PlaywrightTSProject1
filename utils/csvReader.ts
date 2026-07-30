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
    // Resolve the file path from the project root when a relative path is provided.
    // This works correctly for paths like ./test_data/loginData.csv when the tests run from the repo root.
    const candidates = path.isAbsolute(filePath)
        ? [filePath]
        : [
            path.resolve(process.cwd(), filePath),
            path.resolve(__dirname, filePath),
        ];

    const resolvedPath = candidates.find(candidate => fs.existsSync(candidate));

    if (!resolvedPath) {
        throw new Error(`CSV file not found: ${filePath}`);
    }

    // Read the CSV file contents as UTF-8 text.
    const fileContent = fs.readFileSync(resolvedPath, 'utf8');

    // Parse the CSV content into objects, using the first row as column keys.
    const records = parse(fileContent, {
        columns: true,
        skip_empty_lines: true,
        cast: (value, context) => {
            // Keep the `run` column as a string so the test can compare it directly.
            // Example values are `yes` and `no`.
            if (context.column === 'run') {
                return value;
            }
            // Leave other values as strings.
            return value;
        },
    }) as T[];

    return records;
}
