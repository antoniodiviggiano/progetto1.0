import { Component, OnInit } from '@angular/core';
import { DayPilot, DayPilotSchedulerComponent } from 'daypilot-pro-angular';
import { SchedulerService } from '../services/scheduler.service';
import { clienti } from '../actions/app.actions';
import { Data } from '@angular/router';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'scheduler-component',
  templateUrl: './scheduler.component.html',
})
export class SchedulerComponent implements OnInit {
  
  scheduler!: DayPilotSchedulerComponent;
  events: any[] = [];

   config: DayPilot.SchedulerConfig = {
    locale: "it-it",
    timeHeaders: [{"groupBy":"Month"},{"groupBy":"Day","format":"d"}],
    scale: "Day",
    days: DayPilot.Date.today().daysInMonth(),
    startDate: DayPilot.Date.today().firstDayOfMonth(),
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args) => {
      const dp = args['control'];
      const modal = await DayPilot.Modal.prompt("Crea un nuovo evento:", "");
      dp.clearSelection();
      if (modal.canceled) { return; }
      dp.events.add({
        start: args['start'],
        end: args['end'],
        id: DayPilot.guid(),
        resource: args['resource'],
        text: modal.result
      });
       this.schedulerService.addEvents({
        start: args['start'],
        end: args['end'],
        id: DayPilot.guid(),
        resource: args['resource'],
        text: modal.result
      }).subscribe({
        next : (value) => {
          console.log("addEvents", value);
        },
      }) 
    },
    eventMoveHandling: "Update",
    onEventMoved: (args) => {
      args['control'].message("Event moved: " + args['e'].text());
    },
    eventResizeHandling: "Update",
    onEventResized: (args) => {
      args['control'].message("Event resized: " + args['e'].text());

      this.schedulerService.updateEvents(args['e'].data.id, args['newStart'],  args['newEnd']).subscribe({
        next(value) {
            
        },
      })
      
    },

    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
      this.schedulerService.removeEvents(
        args['e'].data.id
      ).subscribe({
        next :(value)=> {},
      })
      args['control'].message("Event deleted: " + args['e'].text());       
    },

    eventClickHandling: "Disabled",
    eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
      onLoad: (args) => {
        // if event object doesn't specify "bubbleHtml" property 
        // this onLoad handler will be called to provide the bubble HTML
        args['html'] = "Event details";
      }
    }),
    treeEnabled: true,
  };



  constructor(private schedulerService: SchedulerService, private http : HttpClient) {
  }

  ngOnInit(): void {
    
     
  }

  /* this.config.resources = [{id: result[0].id, name: result[0].nomeUtente}] */
 
  ngAfterViewInit(): void {
    let clienti: [{ id: number; name: string; } ] = [ {id: 0, name: ''}]
    clienti.shift()
    
    this.schedulerService.users().subscribe({
      next : (value) => { value.map( cliente => clienti.push({id: cliente!.id, name: cliente!.nomeUtente}))
          this.config.resources = clienti

          
        },
    });

/*  const from = this.scheduler.control!.visibleStart();
    const to = this.scheduler.control!.visibleEnd();  */

   this.schedulerService.getEvents().subscribe((result: DayPilot.EventData[]) => {
      this.events = result;

    }); 

  }  

}
