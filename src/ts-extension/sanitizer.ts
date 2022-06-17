import sanitizeHtml from 'sanitize-html'

export class Sanitizer {
  public static sanitize(text: string): string {
    return sanitizeHtml(text)
  }
}
