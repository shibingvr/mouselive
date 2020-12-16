import { InMemoryDbService } from 'angular-in-memory-web-api';
import { EventModel } from './store/models/event.model';

export class InMemoryDataService implements InMemoryDbService {
  createDb(): any {
    const events: EventModel[] = [
      {
        id: 1,
        title: 'Event 1' ,
        address: 'LN UK' ,
        date: '12/10/2015',
        imgsrc: '../../assets/img/download.png'
      },
      {
        id: 2,
        title: 'Event 2' ,
        address: 'NY USA' ,
        date: '2020-12-1',
        imgsrc: '../../assets/img/download.png'
      },
    ];
    return { events };
  }

  genId(events: EventModel[]): number {
    return events.length > 0 ? Math.max(...events.map(event => event.id)) + 1 : 1;
  }
}
