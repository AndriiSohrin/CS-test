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
          id: 1,
          firstName: 'Петро',
          lastName: 'Порошенко',
          secondName: 'Олексійович',
          cars: [
            {
              id: 1,
              stateNumbers: 'AO3312PE',
              manufacturer: 'ВАЗ',
              model: '2101',
              year: 1990,
              ownerId: 1
            },
          ]
        },
        {
          id: 2,
          firstName: 'Володимир',
          lastName: 'Зеленський',
          secondName: 'Олександрович',
          cars: [
            {
              id: 1,
              stateNumbers: 'MC3225PE',
              manufacturer: 'Зил',
              model: '161',
              year: 1995,
              ownerId: 2
            },
          ]
        },
        {
          id: 3,
          firstName: 'Олег',
          lastName: 'Ляшко',
          secondName: 'Валерійович',
          cars: [
            {
              id: 1,
              stateNumbers: 'FF6977AA',
              manufacturer: 'Україна',
              model: 'вело',
              year: 2001,
              ownerId: 2
            },
            {
              id: 2,
              stateNumbers: 'BK6656AP',
              manufacturer: 'Tesla',
              model: 'Model S',
              year: 2012,
              ownerId: 3
            },
          ]
        }
      ]
    };
  }
}
