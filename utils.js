import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class FileMgmt {

    #fileName = `file-${Date.now()}.txt`;

    constructor(fileName) {
        if (fileName) {
            this.#fileName = fileName;
        }
    }

    async read() {
        try {
            let content = await fs.promises.readFile(this.#fileName, 'utf-8');
            return JSON.parse(content);
        } catch (error) {
            if (error.errno == "-4058") {
                await fs.promises.writeFile(this.#fileName, "[]");
                return [];
            }
        }
    }

    async save(newContent) {
        try {
            let content = JSON.stringify(newContent);
            await fs.promises.writeFile(this.#fileName, content);
        } catch (error) {
            console.log("Item not saved.")
        }
    }

    async deleteFile() {
        try {
            await fs.promises.unlink(this.#fileName);
            console.log("File deleted.")
        } catch (error) {
            console.error("Item not deleted.")
        }
    }
}

export { __dirname, FileMgmt };