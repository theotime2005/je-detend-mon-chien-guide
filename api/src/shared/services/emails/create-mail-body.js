import * as fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { marked } from "marked";

import { logger } from "../../logger.js";

const MAIL_FOLDER = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../email-templates",
);
const FOOTER_FILE_NAME = "footer.md";

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

async function createMailBody(documentName, replaceElements) {
  try {
    const documentPath = path.join(MAIL_FOLDER, `${documentName}.md`);
    const footerPath = path.join(MAIL_FOLDER, FOOTER_FILE_NAME);

    const [documentBody, footerBody] = await Promise.all([
      fs.readFile(documentPath, "utf8"),
      fs.readFile(footerPath, "utf8"),
    ]);

    let mailBody = documentBody;

    if (replaceElements) {
      for (const [key, value] of Object.entries(replaceElements)) {
        const placeholder = `{{${escapeRegExp(key)}}}`;
        mailBody = mailBody.replace(new RegExp(placeholder, "g"), value);
      }
    }

    mailBody += footerBody;
    return marked(mailBody);
  } catch (error) {
    logger.error("Error creating mail body", error);
    throw error;
  }
}

export { createMailBody };
