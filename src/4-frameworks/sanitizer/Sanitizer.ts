import { ISanitizer } from "@entities/dependencies/sanitizer";

import sanitizeHtml from "sanitize-html";

export class Sanitizer implements ISanitizer {
  public sanitize(text: string): string {
    return sanitizeHtml(text);
  }
}
