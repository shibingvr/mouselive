import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { SetBreadcrumbAction } from '../store/actions/breadcrumb.actions';
import { AppState } from '../store/models/app-state.model';
import { EventModel } from '../store/models/event.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() config: any = {};
  @Input() data: EventModel;

  constructor(
    private router: Router,
    private store: Store<AppState>,

  ) { }

  ngOnInit(): void {
  }

  openDetailView(): void{
    setTimeout(() => {
      this.store.dispatch(new SetBreadcrumbAction({ title: '' }));
    }, 10);
    this.router.navigate(['/detail', this.data.id]);
  }

  onClickNew(): void{
    setTimeout(() => {
      this.store.dispatch(new SetBreadcrumbAction({title: ''}));
    }, 10);
    this.router.navigate(['/new']);
  }

}
