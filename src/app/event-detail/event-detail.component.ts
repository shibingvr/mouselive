import { Component, OnInit } from '@angular/core';
import { EventModel } from '../models/event-model';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../events.service';

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
  breadcrumbText = '';
  eventForm = new FormGroup({
    title: new FormControl(''),
    address: new FormControl(''),
    date: new FormControl('')
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      const id = +params.id;
      if (id) {
        this.eventsService.getEvent(id).subscribe(
          (res: any) => {
            this.event = res.data;
            this.breadcrumbText = this.event.title + ' Details';
            this.setFormValue();
          }
        );
      }else{
        this.breadcrumbText = 'Add Event';
      }
    });
  }

  setFormValue(): void{
    Object.keys(this.eventForm.controls).forEach(control => {
      if (this.event[control]){
        this.eventForm.controls[control].setValue(this.event[control]);
      }
    });
  }

  showPreview(): void{
    Object.assign(this.event, {
      title: this.eventForm.controls.title.value,
      date: this.eventForm.controls.date.value,
      address: this.eventForm.controls.address.value
    });
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

  getEventModel(): EventModel{
    return this.event;
  }

  addEvent(): void{
    this.eventsService.addEvent(this.getEventModel()).subscribe(
      (res: any) => {
        Object.assign(this.event, res.data);
        this.showNotify('success', 'Event added successfully');
      },
      err => {
        this.showNotify('error', 'Failed to add event');
      }
      );
    }

    updateEvent(): void{
      this.eventsService.updateEvent(this.getEventModel()).subscribe(
        res => {
         // Object.assign(this.event, res.data);
          this.showNotify('success', 'Event updated successfully');
        },
        err => {
          this.showNotify('error', 'Failed to update event');
        }
      );
    }

}
