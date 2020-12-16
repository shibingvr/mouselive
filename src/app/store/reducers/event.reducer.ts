import { EventAction, EventActions } from '../actions/event.actions';
import { EventModel } from '../models/event.model';


export interface EventState {
    list: EventModel[];
    loading: boolean;
    selectedEvent: EventModel;
    error: Error;
}

const initialState: EventState = {
    list: [],
    selectedEvent : null,
    loading: false,
    error: undefined
};

export function EventReducer(
    state: EventState = initialState,
    action: EventAction
): any {
    switch (action.type) {
        case EventActions.LOAD_EVENTS :
            return {
                ...state,
                loading: true
            };
            break;

        case EventActions.LOAD_EVENTS_SUCCESS :
            return {
                ...state,
                list : action.payload,
                loading: false
            };
            break;

        case EventActions.LOAD_EVENTS_FAILURE :
            return {
                ...state,
                error: action.payload,
                loading : false
            };
            break;

        case EventActions.GET_EVENT:
            return { ...state, list: [], selectedEvent: null, loading: true };
            break;

        case EventActions.GET_EVENT_SUCCESS:
            return { ...state, list: [], selectedEvent: action.payload, loading: false };
            break;

        case EventActions.GET_EVENT_FAILURE:
            return { ...state,  loading: false, error: action.payload };
            break;

        case EventActions.ADD_EVENT:
            return  {...state, list: action.payload, loading: true };
            break;

        case EventActions.ADD_EVENT_SUCCESS:
            return { ...state, list: action.payload, loading: false };
            break;

        case EventActions.ADD_EVENT_FAILURE:
            return { ...state, list: action.payload, loading: false, error: action.payload};
            break;

       case EventActions.UPDATE_EVENT:
            return { ...state, selectedEvent: action.payload};
            break;

        case EventActions.UPDATE_EVENT_SUCCESS:
            return { ...state, loading: false };
            break;

        case EventActions.UPDATE_EVENT_FAILURE:
            return { ...state, loading: false,  };
            break;

        default:
            return state;
            break;
    }
}
