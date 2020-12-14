import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { EventCardComponent } from './event-card.component';

class MokeRouter { }

describe('EventCardComponent', () => {
  let component: EventCardComponent;
  let fixture: ComponentFixture<EventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCardComponent ],
      providers: [
        { provide: Router, useClass: MokeRouter },
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
});
