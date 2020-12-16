import { TestBed, async, fakeAsync } from '@angular/core/testing';
import { of } from "rxjs";
import { EventsService } from 'src/app/events.service';

const event = {
    id: 1,
    title: 'Test Event 111',
    date: '2020-12-12',
    address: 'NY USA',
    imgsrc: '../../assets/img/download.png'
};

const events = [event];
const error = new Error();

class MockEventsService {
    getEvents = () => {
        return events
    }

    getEvent = (id) => {
        return events.find(item => item.id == id);
    }
}

describe('EventsEffects', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [],
            providers: [
                { provide: EventsService, useClass: MockEventsService }
            ],
        }).compileComponents();
    });


    describe('#loadEvents$', () => {

        it('it should return <EventModel[]>.', fakeAsync(() => {
            let service = new MockEventsService();
            expect(service.getEvents()).toBe(events);
        }));

    });

    describe('#getvent$', () => {

        it('it should return <EventModel>.', fakeAsync(() => {
            let service = new MockEventsService();

            expect(service.getEvent(1)).toBe(event);

        }));

        it('it should not return value.', fakeAsync(() => {
            let service = new MockEventsService();
            expect(service.getEvent(2)).not.toBe(event);

        }));

    });


});
