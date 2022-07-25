export class GoogleFiles {
  kind?: string;
  incompleteSearch?: boolean;
  items?: Array<{
    id?: string;
    kind?: string;
    title?: string;
    mimeType?: string;
    parents?: any
  }> = [];
}
