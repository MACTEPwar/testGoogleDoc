import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'iconByMimeType',
})
export class IconByMimeTypePipe implements PipeTransform {
  ASSOC = new Map<string, string>([
    ['application/vnd.google-apps.folder', 'pi-folder'],
    ['application/vnd.google-apps.document', 'pi-file'],
    ['undefined', 'pi-file'],
  ]);
  transform(mimeType: string) {
    return this.ASSOC.get(mimeType) ?? this.ASSOC.get('undefined');
  }
}
