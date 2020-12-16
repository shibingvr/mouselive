import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { EventModel } from './store/models/event.model';

describe('InMemoryDataService', () => {
  let service: InMemoryDataService;
  const dummyEvents: EventModel[] = [
    {
      id: 1,
      title: 'Test Event',
      date: '12/10/2020',
      address: 'NY USA',
      imgsrc: '../../assets/img/download.png'
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientInMemoryWebApiModule.forRoot(
          InMemoryDataService, { dataEncapsulation: true }
        )
      ],
      providers: [InMemoryDataService]
    });
    service = TestBed.inject(InMemoryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#genId', () => {
    it('should return an number', () => {
      const id = service.genId(dummyEvents);
      expect(id).toBeInstanceOf(Number);
      expect(id).toBe(2);
    });
  });

});
