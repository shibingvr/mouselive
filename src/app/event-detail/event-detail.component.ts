import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../events.service';
import { AppState } from '../store/models/app-state.model';
import { select, Store } from '@ngrx/store';
import { AddEventAction, GetEventAction, UpdateEventAction } from '../store/actions/event.actions';
import { SetBreadcrumbAction } from '../store/actions/breadcrumb.actions';
import { Breadcrumb } from '../store/models/breadcrumb.model';
import { Observable } from 'rxjs';
import { EventModel } from '../store/models/event.model';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event: EventModel = {
    title: '',
    date: '',
    address: '',
    imgsrc: '../../assets/img/download.png'
  };
  isShowNotify = false;
  notifyMsg = '';
  notifyType = '';
  invalid: any = {};
  eventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    address: new FormControl(''),
    date: new FormControl(''),
    dateDummy: new FormControl('')
  });

  event$: Observable<any>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.eventsService.detailComponent = this;
    this.activatedRoute.params.subscribe((params: any) => {
      const id = +params.id;
      if (id) {

        this.store.dispatch(new GetEventAction(id));

        this.store.pipe(select('events')).subscribe(data => {
          if (data.selectedEvent){
            this.event = Object.assign({}, data.selectedEvent);
            this.setBreadcrumb(this.event.title + ' Details');
            this.setFormValue();
          }
        });

      }else{
        setTimeout(() => {
          this.setBreadcrumb('Add Event');
        }, 100);
      }
    });
  }

  setBreadcrumb(title: string): void{
    const breadcrumb: Breadcrumb = {
      title,
      onClick: this.showList.bind(this)
    };
    this.store.dispatch(new SetBreadcrumbAction(breadcrumb));
  }

  setFormValue(): void{
    const data: any = Object.assign({}, this.event);
    const parts = data.date.split('-');
    data.date = {
      year: +parts[0],
      month: +parts[1],
      day: +parts[2]
    };

    Object.keys(this.eventForm.controls).forEach(control => {
      this.eventForm.controls[control].setValue(data[control] || '');
    });
  }

  showPreview(): void{
    const date = this.eventForm.controls.date.value;
    const formattedDate = date ? `${date.year}-${date.month}-${date.day}` : '';
    Object.assign(this.event, {
      title: this.eventForm.controls.title.value,
      date: formattedDate,
      address: this.eventForm.controls.address.value
    });
  }

  validateDate(date: any): boolean{

    let isInvalid = false;
    if (typeof date === 'string') {
      isInvalid = true;
    }

    return isInvalid;

  }

  showNotify(type, msg): void{
    this.isShowNotify = true;
    this.notifyType = type;
    this.notifyMsg = msg;
    setTimeout(() => {
      this.isShowNotify = false;
      this.notifyType = '';
      this.notifyMsg = '';
    }, 1000);
  }

  showList(): void{
    this.router.navigate(['/home']);
  }

  showDetail(id): void{
    this.router.navigate(['/detail', id]);
  }

  getEventModel(): EventModel{
    return this.event;
  }

  validate(): boolean{
    this.invalid = {};
    if (this.eventForm.valid) {
      return true;
    }else{

      if (this.eventForm.controls.title.invalid) {
        this.invalid.title = true;
        this.showNotify('danger', 'Please enter valid title.');
      }

      if (this.validateDate(this.eventForm.controls.date.value)){
        this.invalid.date = true;
        this.showNotify('danger', 'Please enter valid date.');
      }

      return false;
    }
  }

  changeDate(): void{
    if (!this.validateDate(this.eventForm.controls.date.value)) {
      this.showPreview();
    }
  }

  addEvent(): void{
    if (this.validate()) {
      this.store.dispatch(new AddEventAction(this.getEventModel()));
    }
  }

  updateEvent(): void{
    if (this.validate()) {
      this.store.dispatch(new UpdateEventAction(this.getEventModel()));
    }
  }

}
