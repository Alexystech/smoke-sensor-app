import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
import { Data } from './model/data';
import { SensorDataService } from './service/sensor-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  view: [number, number] = [1000, 500];

  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Fecha';
  yAxisLabel: string = 'PPM';
  timeline: boolean = true;

  lastTenData: any;

  multi = [
    {
      "name": "PPM",
      "series": [{
        "name": "1999", 
        "value": 100
      }]
    }
  ];

  constructor(
    public sensorDataService: SensorDataService
  ) {}

  ngOnInit(): void {

    this.updateChart();

  }

  async updateChart() {

    let band = true;
    

    while (band === true) {
      
      let dataArray: Data[] = [];

      this.sensorDataService.getLastTen().subscribe(resp => {
        
        this.lastTenData = resp;

        for (let item of resp) {

          let data: Data = new Data();
        
          data.name = item.date;
          data.value = item.ppm;

          dataArray.push(data);
        }

        console.log(dataArray);

        let updateMulti = [
          {
            "name": "PPM",
            "series": dataArray
          }
        ];
  
        this.multi = Array.from(updateMulti);
        dataArray = [];

      },
        error => { console.error(error) }
      );

      await timer(5000).pipe(take(1)).toPromise();
    }
  
  }

  onSelect(event: any) {
    console.log(event);
  }

}
