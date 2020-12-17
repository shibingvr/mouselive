import { Injectable } from '@angular/core';
import { Actions, Effect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { EventsService } from 'src/app/events.service';
import {
    AddEventAction,
    AddEventFailureAction,
    AddEventSuccessAction,
    EventActions,
    GetEventAction,
    GetEventFailureAction,
    GetEventSuccessAction,
    LoadEventsAction,
    LoadEventsFailureAction,
    LoadEventsSuccessAction,
    UpdateEventAction,
    UpdateEventFailureAction,
    UpdateEventSuccessAction
} from '../actions/event.actions';

@Injectable()
export class EventsEffects {
    @Effect() loadEvents$ = this.actions$.pipe(
        ofType<LoadEventsAction>(EventActions.LOAD_EVENTS),
        mergeMap(
            () => this.eventsService.getEvents()
            .pipe(
                map( data => new LoadEventsSuccessAction(data)),
                catchError( err => of(new LoadEventsFailureAction(err)))
            )
        )
    );

    @Effect() addEvent$ = this.actions$.pipe(
        ofType<AddEventAction>(EventActions.ADD_EVENT),
        mergeMap(
            (data) => this.eventsService.addEvent(data.payload).pipe(
                map(res => new AddEventSuccessAction(res)),
                catchError(err => of(new AddEventFailureAction(err)))
            )
        )
    );

    @Effect() updateEvent$ = this.actions$.pipe(
        ofType<UpdateEventAction>(EventActions.UPDATE_EVENT),
        mergeMap(
            (data) => this.eventsService.updateEvent(data.payload).pipe(
                map( res => new UpdateEventSuccessAction(res)),
                catchError(err => of(new UpdateEventFailureAction(err)))
            )
        )
    );

    @Effect() getvent$ = this.actions$.pipe(
        ofType<GetEventAction>(EventActions.GET_EVENT),
        mergeMap(
            (data) => this.eventsService.getEvent(data.payload).pipe(
                map(mapdata => new GetEventSuccessAction(mapdata)),
                catchError(err => of(new GetEventFailureAction(err)))
            )
        )
    );

     constructor(
         private actions$: Actions,
         private eventsService: EventsService,
     ) { }


}
