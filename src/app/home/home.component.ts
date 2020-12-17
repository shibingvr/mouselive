import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EventsService } from '../events.service';
import { SetBreadcrumbAction } from '../store/actions/breadcrumb.actions';
import { LoadEventsAction } from '../store/actions/event.actions';
/* import { EventModel } from '../models/event-model'; */
import { AppState } from '../store/models/app-state.model';
import { Breadcrumb } from '../store/models/breadcrumb.model';
import { EventModel } from '../store/models/event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events: EventModel[] = [];
  events$: Observable<Array<EventModel>>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;

  constructor(
    private eventsService: EventsService,
    private store: Store<AppState>
  ) { }

  newEventConfig = {
    isNewMode : true
  };
  loadingEventConfig = {
    isLoading : true
  };

  ngOnInit(): void {

    setTimeout(() => {
      this.store.dispatch(new SetBreadcrumbAction({title: 'Home', onClick: undefined}));
    }, 200);

    this.events$ = this.store.select(store => store.events.list);
    this.loading$ = this.store.select(store => store.events.loading);
    this.error$ = this.store.select(store => store.events.error);

    this.store.dispatch(new LoadEventsAction());
  }

}
