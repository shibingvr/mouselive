import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ClickBreadcrumbAction } from './store/actions/breadcrumb.actions';
import { AppState } from './store/models/app-state.model';
import { Breadcrumb } from './store/models/breadcrumb.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'mouselive';
  breadcrumb$: Observable<Breadcrumb>;
  constructor(
    private store: Store<AppState>
  ){}

  ngOnInit(): void {

    this.breadcrumb$ = this.store.select(store => store.breadcrumb);
  }

  onClickBR(): void{

    this.store.dispatch(new ClickBreadcrumbAction());
  }
}
