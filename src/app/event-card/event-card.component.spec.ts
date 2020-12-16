import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, inject, async, waitForAsync  } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { EventsEffects } from '../store/effects/events.effects';
import { BreadcrumbReducer } from '../store/reducers/breadcrumb.reducer';
import { EventReducer } from '../store/reducers/event.reducer';

import { EventCardComponent } from './event-card.component';

class MokeRouter {
  navigate: () => void;
}

describe('EventCardComponent', () => {
  let component: EventCardComponent;
  let fixture: ComponentFixture<EventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCardComponent ],
      imports: [
        HttpClientModule,
        StoreModule.forRoot({
          events: EventReducer,
          breadcrumb: BreadcrumbReducer
        }),
        EffectsModule.forRoot([EventsEffects]),
        RouterTestingModule.withRoutes([]),
        NgbModule
      ],
      providers: [

      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#openDetailView', () => {
    it('should go detail view with <id>', waitForAsync(inject([Router], (router) => {
      component.data = {
        id: 1,
        title: 'Event 1',
        address: 'NY USA',
        date: '2020-12-13'
      };

      spyOn(router, 'navigate');

      component.openDetailView();
      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/detail', component.data.id]);

    })));
  });

  describe('#onClickNew', () => {
    it('should go new form', waitForAsync(inject([Router], (router) => {

      spyOn(router, 'navigate');

      component.onClickNew();
      expect(router.navigate).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/new']);

    })));
  });
});
