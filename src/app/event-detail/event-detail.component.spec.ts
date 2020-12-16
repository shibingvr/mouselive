import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, TestBed, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { EventsService } from '../events.service';
import { EventsEffects } from '../store/effects/events.effects';
import { BreadcrumbReducer } from '../store/reducers/breadcrumb.reducer';
import { EventReducer } from '../store/reducers/event.reducer';

import { EventDetailComponent } from './event-detail.component';
import { By } from '@angular/platform-browser';


class MockActivatedRoute { }
class MockRouter{ }
class MockEventsService {
  getEvent = (id) => {
    return of(
      {
        id: 1,
        title: 'Test Event 111',
        date: '2020-12-12',
        address: 'NY USA',
        imgsrc: '../../assets/img/download.png'
      }
    );
  }
}

describe('EventDetailComponent', () => {
  let component: EventDetailComponent;
  let fixture: ComponentFixture<EventDetailComponent>;
  let titleField: DebugElement = null;
  let addressField: DebugElement = null;
  let dateField: DebugElement = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDetailComponent ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          events: EventReducer,
          breadcrumb: BreadcrumbReducer
        }),
        EffectsModule.forRoot([EventsEffects]),
        NgbModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 1 }),
          },
        },
        { provide: Router, useClass: MockRouter  },
        { provide: EventsService, useClass: MockEventsService }
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    titleField = fixture.debugElement.query(By.css('#title'));
    addressField = fixture.debugElement.query(By.css('#adrs'));
    dateField = fixture.debugElement.query(By.css('#dt'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have following basic fields
    Title, Address, Date.`, () => {
      const form = component.eventForm;
      expect(titleField).toBeTruthy();
      expect(addressField).toBeTruthy();
      expect(dateField).toBeTruthy();
  });

  describe('#setFormValue', () => {

    it('it should set values in to form.', fakeAsync(() => {
      component.event = {
        id: 1,
        title: 'Event 1',
        address: 'NY USA',
        date: '2020-12-13'
      };
      component.setFormValue();
      fixture.detectChanges();


      const form = component.eventForm;
      const datePickerData = {
        year: 2020,
        month: 12,
        day: 13
      };

      expect(form.controls.title.value === 'Event 1').toBeTruthy();
      expect(form.controls.address.value === 'NY USA').toBeTruthy();
      expect(form.controls.date.value).toEqual(jasmine.objectContaining(datePickerData));
      flushMicrotasks();
      flush();
      discardPeriodicTasks();
    }));

  });

  describe('#validate', () => {
    it('should return form invalid', fakeAsync(() => {
      component.event = {
        title: '',
        address: '',
        date: ''
      };
      component.setFormValue();
      fixture.detectChanges();
      expect(component.validate()).toBeFalse();

      flushMicrotasks();
      flush();
      discardPeriodicTasks();
    }));

    it('should return form valid', fakeAsync(() => {
      component.event = {
        id: 1,
        title: 'Event 1',
        address: 'NY USA',
        date: '2020-12-13'
      };
      component.setFormValue();
      fixture.detectChanges();
      expect(component.validate()).toBeTrue();

      flushMicrotasks();
      flush();
      discardPeriodicTasks();
    }));
    it('should return form inValid because of invalid date', fakeAsync(() => {
      component.event = {
        id: 1,
        title: 'Event 1',
        address: 'NY USA',
        date: '2020-12-13'
      };
      component.setFormValue();
      fixture.detectChanges();
      expect(component.validate()).toBeTrue();

      flushMicrotasks();
      flush();
      discardPeriodicTasks();
    }));
  });

  describe('#validateDate', () => {
    it('should return an boolean', () => {
      const errorDate = '2020-12-14';
      const currectDate = {
        day: 12,
        month : 11,
        year: 2020
      };
      expect(component.validateDate(errorDate)).toBeTrue();
      expect(component.validateDate(currectDate)).toBeFalse();
    });
  });

  describe('#getEventModel', () => {


    it('should return an <EventModel>', () => {
      component.event = {
        id: 1,
        title: 'Test Event',
        date: '2020-12-12',
        address: 'NY USA',
        imgsrc: '../../assets/img/download.png'
      };
      expect(component.getEventModel()).not.toBeNull();
    });
  });

});
