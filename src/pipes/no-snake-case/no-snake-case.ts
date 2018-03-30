import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noSnakeCase',
})
export class NoSnakeCasePipe implements PipeTransform {
  transform(value: string, ...args) {
    return value.toString().toLowerCase().replace(/_/g, " ");
  }
}
