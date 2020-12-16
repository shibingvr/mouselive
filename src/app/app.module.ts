import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EventCardComponent } from './event-card/event-card.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { FeatureModule } from './feature/feature.module';
import { StoreModule } from '@ngrx/store';
import { EventReducer } from './store/reducers/event.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EventsEffects } from './store/effects/events.effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BreadcrumbReducer } from './store/reducers/breadcrumb.reducer';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventCardComponent,
    EventDetailComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: true}
    ),
    StoreModule.forRoot({
      events: EventReducer,
      breadcrumb: BreadcrumbReducer
    }),
    EffectsModule.forRoot([EventsEffects]),
    NgbModule
  ],
  providers: [InMemoryDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
