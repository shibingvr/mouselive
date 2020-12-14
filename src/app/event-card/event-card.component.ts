import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '../models/event-model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() config: any = {};
  @Input() data: EventModel;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  openDetailView(): void{
    this.router.navigate(['/detail', this.data.id]);
  }

  onClickNew(): void{
    this.router.navigate(['/new']);
  }

}
