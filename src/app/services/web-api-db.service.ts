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
              model: '2101',
              year: 1990,
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
              manufacturer: 'Зил',
              model: '161',
              year: 1995,
              ownerId: 1
            },
          ]
        },
        {
          id: 2,
          firstName: 'Олег',
          lastName: 'Ляшко',
          secondName: 'Валерійович',
          cars: [
            {
              id: 0,
              stateNumbers: 'МС69PE',
              manufacturer: 'Україна',
              model: 'вело',
              year: 2001,
              ownerId: 2
            },
            {
              id: 1,
              stateNumbers: 'ВК666АР',
              manufacturer: 'Tesla',
              model: 'Model S',
              year: 2012,
              ownerId: 2
            },
          ]
        }
      ]
    };
  }
}
