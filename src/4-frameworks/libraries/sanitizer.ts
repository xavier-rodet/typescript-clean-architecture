import { ISanitizer } from '@entities/_common/libraries/sanitizer';
import sanitizeHtml from 'sanitize-html';

export class Sanitizer implements ISanitizer {
  public sanitize(text: string): string {
    return sanitizeHtml(text);
  }
}
