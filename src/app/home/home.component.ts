import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import { EventModel } from '../models/event-model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: EventModel[] = [];

  constructor(
    private eventsService: EventsService
  ) { }

  newEventConfig = {
    isNewMode : true
  };

  ngOnInit(): void {
    this.eventsService.getEvents().subscribe(
      (res: any) => {
        this.events = res.data;
      },
      err => {
        this.events = [];
      }
    );
  }

}
