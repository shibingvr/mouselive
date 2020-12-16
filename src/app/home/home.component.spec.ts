import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { EventsService } from '../events.service';
import { EventsEffects } from '../store/effects/events.effects';
import { BreadcrumbReducer } from '../store/reducers/breadcrumb.reducer';
import { EventReducer } from '../store/reducers/event.reducer';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  class EventsServiceMock {
    getEvents(): any {
      return of([]);
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
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
          provide: EventsService,
          useClass: EventsServiceMock
        },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
