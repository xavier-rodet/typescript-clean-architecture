import sanitizeHtml from 'sanitize-html';

export class SanitizerUtil {
  public static sanitize(text: string): string {
    return sanitizeHtml(text);
  }
}
