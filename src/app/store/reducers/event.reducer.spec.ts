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
import { EventReducer, EventState } from './event.reducer';


describe('EventReducer', () => {
    const initialState: EventState = {
        list: [],
        selectedEvent: null,
        loading: false,
        error: undefined
    };

    it('should return default state', () => {
        const action = {} as any;
        const state = EventReducer(initialState, action);
        expect(state).toBe(initialState);
    });
});