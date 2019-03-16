import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({
    name: 'tasks'
})
export class FiltersPipeCustom implements PipeTransform {

  transform(tasks: any[]) {
      console.log(tasks);
    return tasks.sort(function(a, b){
        return a.createdDate - b.createdDate;
    });
  }
}