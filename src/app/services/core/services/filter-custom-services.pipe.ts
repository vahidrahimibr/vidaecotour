import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filterCustomServices' })
export class FilterCustomServicesPipe implements PipeTransform {
  private predefined = ['Flights', 'Transfer', 'Accommodation', 'Package', 'Tour'];

  transform(services: string[]): string[] {
    return services.filter((s) => !this.predefined.includes(s));
  }
}
