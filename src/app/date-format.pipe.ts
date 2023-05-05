import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(date: Date): string {
    return formatDate(date, 'dd-MM-yyyy', 'en-US');
  }
}
