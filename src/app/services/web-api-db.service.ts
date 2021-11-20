import {Injectable} from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class WebApiDBService implements InMemoryDbService {

  constructor() {
  }

  createDb() {
    return {
      owners: [
        {
          id: 0,
          firstName: 'Петро',
          lastName: 'Порошенко',
          secondName: 'Олексійович',
          cars: [
            {
              id: 0,
              stateNumbers: 'AO3312PE',
              manufacturer: 'ВАЗ',
              model: '2102',
              year: 1976,
              ownerId: 0
            },
          ]
        },
        {
          id: 1,
          firstName: 'Володимир',
          lastName: 'Зеленський',
          secondName: 'Олександрович',
          cars: [
            {
              id: 0,
              stateNumbers: 'МС32215PE',
              manufacturer: 'BMW',
              model: 'X6',
              year: 2011,
              ownerId: 1
            },
            {
              id: 1,
              stateNumbers: '66',
              manufacturer: 'BMW',
              model: 'X6',
              year: 2011,
              ownerId: 1
            }
          ]
        }
      ]
    };
  }
}
