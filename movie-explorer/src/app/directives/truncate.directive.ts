import { Directive, Input, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    limit: number = 50,
    completeWords: boolean = false,
    ellipsis: string = '...'
  ): string {
    if (!value) return '';

    if (value.length <= limit) {
      return value;
    }

    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
      if (limit === -1) {
        return value;
      }
    }

    return `${value.substr(0, limit)}${ellipsis}`;
  }
}

@Directive({
  selector: '[appTruncate]',
})
export class TruncateDirective {
  @Input() appTruncate: number = 50;
  @Input() completeWords: boolean = false;

  constructor() {}
}
