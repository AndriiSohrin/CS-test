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
          name: 'Петро',
          surname: 'Порошенко',
          patronymic: 'Олексійович',
          cars: [
            {
              id: 0,
              stateNumbers: 'AO3312PE',
              manufacturer: 'ВАЗ',
              model: '2102',
              year: 1976
            },
          ]
        },
        // {
        //   id: 1,
        //   name: 'Володимир',
        //   surname: 'Зеленський',
        //   patronymic: 'Олександрович',
        //   cars: [
        //     {
        //       id: 0,
        //       stateNumbers: 'МС32215PE',
        //       manufacturer: 'BMW',
        //       model: 'X6',
        //       year: 2011
        //     }
        //   ]
        // },
        // {
        //   id: 2,
        //   name: 'Юлія',
        //   surname: 'Тимошенко',
        //   patronymic: 'Володимирівна',
        //   cars: [
        //     {
        //       id: 0,
        //       stateNumbers: 'AO1777PE',
        //       manufacturer: 'ЗАЗ',
        //       model: '968М',
        //       year: 1991
        //     }
        //   ]
        // },
        // {
        //   id: 3,
        //   name: 'Andrii',
        //   surname: 'Sokhryn',
        //   patronymic: 'Vasyliovuch',
        //   cars: [
        //     {
        //       id: 0,
        //       stateNumbers: 'AO3312PE',
        //       manufacturer: 'BMW',
        //       model: 'X6',
        //       year: 2011
        //     }
        //   ]
        // },
      ]
    };
  }
}
