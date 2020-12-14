import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventModel } from './models/event-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  readonly urls = {
    events : 'api/events'
  };

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) { }

  getEvents(): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(this.urls.events);
  }

  getEvent(id: number): Observable<EventModel> {
    const url = `${this.urls.events}/${id}`;
    return this.http.get<EventModel>(url);
  }

  addEvent(event: EventModel): Observable<EventModel> {
    return this.http.post<EventModel>(this.urls.events, event, this.httpOptions);
  }

  updateEvent(event: EventModel): Observable<any> {
    return this.http.put(this.urls.events, event, this.httpOptions);
  }

}
