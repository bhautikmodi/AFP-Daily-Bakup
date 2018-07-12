import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlToPlaintext'
})
export class HtmlToPlaintextPipe implements PipeTransform {

  transform(text: string): string {
    return text ? text.replace(/]+>/gm, '') : '';
  }

}
