import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, limit: number = 50, completeWords: boolean = false, ellipsis: string = '...'): string {
    if (!value) return '';
    
    if (completeWords) {
      limit = value.substring(0, limit).lastIndexOf(' ');
      if (limit === -1) return value;
    }
    
    return value.length > limit ? `${value.substring(0, limit)}${ellipsis}` : value;
  }
}