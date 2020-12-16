import {Action} from '@ngrx/store';
import {EventModel} from '../models/event.model';

export enum EventActions{
    LOAD_EVENTS = '[EVENT] Load Events',
    LOAD_EVENTS_SUCCESS = '[EVENT] Load Events Sucess',
    LOAD_EVENTS_FAILURE = '[EVENT] Load Events Failure',

    GET_EVENT = '[EVENT] Get Event',
    GET_EVENT_SUCCESS = '[EVENT] Get Event Sucess',
    GET_EVENT_FAILURE = '[EVENT] Get Event Failure',

    ADD_EVENT = '[EVENT] Add Event',
    ADD_EVENT_SUCCESS = '[EVENT] Add Event Sucess',
    ADD_EVENT_FAILURE = '[EVENT] Add Event Failure',

    UPDATE_EVENT = '[EVENT] Update Event',
    UPDATE_EVENT_SUCCESS = '[EVENT] Update Event Sucess',
    UPDATE_EVENT_FAILURE = '[EVENT] Update Event Failure',
}

export class LoadEventsAction implements Action {
    readonly type = EventActions.LOAD_EVENTS;
}

export class LoadEventsSuccessAction implements Action {
    readonly type = EventActions.LOAD_EVENTS_SUCCESS;

    constructor(public payload: Array<EventModel>) { }
}

export class LoadEventsFailureAction implements Action {
    readonly type = EventActions.LOAD_EVENTS_FAILURE;

    constructor(public payload: Error) { }
}

export class GetEventAction implements Action {
    readonly type = EventActions.GET_EVENT;

    constructor(public payload: number) { }
}

export class GetEventSuccessAction implements Action {
    readonly type = EventActions.GET_EVENT_SUCCESS;

    constructor(public payload: EventModel) { }
}

export class GetEventFailureAction implements Action {
    readonly type = EventActions.GET_EVENT_FAILURE;

    constructor(public payload: Error) { }
}

export class AddEventAction implements Action{
    readonly  type = EventActions.ADD_EVENT;

    constructor( public payload: EventModel ){}
}

export class AddEventSuccessAction implements Action {
    readonly type = EventActions.ADD_EVENT_SUCCESS;

    constructor(public payload: EventModel) { }
}

export class AddEventFailureAction implements Action {
    readonly type = EventActions.ADD_EVENT_FAILURE;

    constructor(public payload: Error) { }
}

export class UpdateEventAction implements Action{
    readonly  type = EventActions.UPDATE_EVENT;

    constructor( public payload: EventModel){ }
}

export class UpdateEventSuccessAction implements Action {
    readonly type = EventActions.UPDATE_EVENT_SUCCESS;

    constructor(public payload: EventModel) { }
}

export class UpdateEventFailureAction implements Action {
    readonly type = EventActions.UPDATE_EVENT_FAILURE;

    constructor(public payload: Error) { }
}

export type EventAction =
   | AddEventAction
   | AddEventSuccessAction
   | AddEventFailureAction
   | UpdateEventAction
   | UpdateEventSuccessAction
   | UpdateEventFailureAction
   | LoadEventsAction
   | LoadEventsSuccessAction
   | LoadEventsFailureAction
   | GetEventAction
   | GetEventSuccessAction
   | GetEventFailureAction;

