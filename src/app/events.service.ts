import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventModel, EventRespModel } from './store/models/event.model';

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

  /* tslint:disable */
  private _detailComponent: EventDetailComponent;
  /* tslint:enable */

  constructor(
    private http: HttpClient,
  ) { }


  public set detailComponent(v: any) {
    this._detailComponent = v;
  }


  getEvents(): Observable<EventModel[]> {
    return this.http.get<EventRespModel>(this.urls.events)
      .pipe(
        delay(200),
        map(res => res.data)
      );
  }

  getEvent(id: number): Observable<EventModel> {
    const url = `${this.urls.events}/${id}`;
    return this.http.get<EventRespModel>(url).pipe(
      delay(200),
      map( res => res.data)
    );
  }

  addEvent(event: EventModel): Observable<EventModel> {
    return this.http.post<EventRespModel>(this.urls.events, event, this.httpOptions).pipe(
      delay(200),
      map(res => {
        this._detailComponent.showDetail(res.data.id);
        this._detailComponent.showNotify('success', 'Event added successfully');
        return res.data;
      })
      );
  }

  updateEvent(event: EventModel): Observable<any> {
    return this.http.put<EventRespModel>(this.urls.events, event, this.httpOptions).pipe(
      delay(200),
      map(res => {
        this._detailComponent.showNotify('success', 'Event updated successfully');
        return res.data;
      })
    );
  }

}
