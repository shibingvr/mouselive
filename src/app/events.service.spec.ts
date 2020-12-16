import { discardPeriodicTasks, fakeAsync, flush, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { EventsService } from './events.service';
import { of } from 'rxjs';
import { EventModel } from './store/models/event.model';

describe('EventsService', () => {
  let service: EventsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    service = TestBed.inject(EventsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getEvents', () => {
    it('should return an Observable<EventModel[]>', fakeAsync(() => {
      const dummyEvents: EventModel[] = [
        {
          id: 1,
          title: 'Test Event',
          date: '12/10/2020',
          address: 'NY USA',
          imgsrc: '../../assets/img/download.png'
        },
      ];

      service.getEvents().subscribe(events => {
        expect(events.length).toBe(1);
        expect(events).toEqual(dummyEvents);
        return of(dummyEvents);
      });

      const req = httpMock.expectOne(service.urls.events);
      expect(req.request.method).toBe('GET');
      req.flush(dummyEvents);
      flush();
      discardPeriodicTasks();
    }));
  });

  describe('#getEvent', () => {
    it('should return an Observable<EventModel>', fakeAsync(() => {
      const dummyEvent: EventModel = {
        id: 1,
        title: 'Test Event',
        date: '12/10/2020',
        address: 'NY USA',
        imgsrc: '../../assets/img/download.png'
      };
      service.getEvent(1).subscribe(event => {
        expect(event).toEqual(dummyEvent);
        expect(1).toEqual(dummyEvent.id);
        return of(dummyEvent);
      });

      const req = httpMock.expectOne(`${service.urls.events}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyEvent);
      flush();
      discardPeriodicTasks();
    }));
  });

});
