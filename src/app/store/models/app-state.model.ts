import { EventState } from '../reducers/event.reducer';
import { Breadcrumb } from './breadcrumb.model';
import { EventModel } from './event.model';

export interface AppState {
    readonly events: EventState;
    readonly breadcrumb: Breadcrumb;
}
