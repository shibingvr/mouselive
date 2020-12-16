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
} from './event.actions';

describe('Event Actions', () => {
    const event = {
        id: 1,
        title: 'Event 1',
        address: 'NY USA',
        date: '2020-12-13'
    };

    const events = [event];
    const error = new Error();

    it('should create LoadEventsAction action', () => {
        const action = new LoadEventsAction();

        expect(action.type).toEqual(EventActions.LOAD_EVENTS);
    });


    it('should create LoadEventsSuccessAction action', () => {
        const action = new LoadEventsSuccessAction(events);

        expect(action.type).toEqual(EventActions.LOAD_EVENTS_SUCCESS);
        expect(action.payload).toEqual(events);
    });

    it('should create LoadEventsFailureAction action', () => {
        const action = new LoadEventsFailureAction(error);

        expect(action.type).toEqual(EventActions.LOAD_EVENTS_FAILURE);
        expect(action.payload).toEqual(error);
    });

    it('should create GetEventAction action', () => {
        const action = new GetEventAction(1);

        expect(action.type).toEqual(EventActions.GET_EVENT);
    });

    it('should create GetEventSuccessAction action', () => {
        const action = new GetEventSuccessAction(event);

        expect(action.type).toEqual(EventActions.GET_EVENT_SUCCESS);
        expect(action.payload).toEqual(event);
    });

    it('should create GetEventFailureAction action', () => {
        const action = new GetEventFailureAction(error);

        expect(action.type).toEqual(EventActions.GET_EVENT_FAILURE);
        expect(action.payload).toEqual(error);
    });

    it('should create AddEventAction action', () => {
        const action = new AddEventAction(event);

        expect(action.type).toEqual(EventActions.ADD_EVENT);
    });

    it('should create AddEventSuccessAction action', () => {
        const action = new AddEventSuccessAction(event);

        expect(action.type).toEqual(EventActions.ADD_EVENT_SUCCESS);
        expect(action.payload).toEqual(event);
    });

    it('should create AddEventFailureAction action', () => {
        const action = new AddEventFailureAction(error);

        expect(action.type).toEqual(EventActions.ADD_EVENT_FAILURE);
        expect(action.payload).toEqual(error);
    });

    it('should create UpdateEventAction action', () => {
        const action = new UpdateEventAction(event);

        expect(action.type).toEqual(EventActions.UPDATE_EVENT);
    });

    it('should create UpdateEventSuccessAction action', () => {
        const action = new UpdateEventSuccessAction(event);

        expect(action.type).toEqual(EventActions.UPDATE_EVENT_SUCCESS);
        expect(action.payload).toEqual(event);
    });

    it('should create UpdateEventFailureAction action', () => {
        const action = new UpdateEventFailureAction(error);

        expect(action.type).toEqual(EventActions.UPDATE_EVENT_FAILURE);
        expect(action.payload).toEqual(error);
    });

});
