import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() position: any;
  @Input() stat1: any = ''
  @Input() stat2: any = ''
  displayedColumns: string[] = ['first_name', 'last_name', 'team'];
  graphArray!: MatTableDataSource<any>;
  graphData: any;
  stat1Average!: any;
  stat2Average!: any;
  showData = false;
  stat1CSV!: string;
  stat2CSV!: string;
  resultsLength!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.displayedColumns.push(this.stat1)
    this.displayedColumns.push(this.stat2)
    if (this.position && this.stat1 && this.stat1) {
      this.showData = true;
    }
    switch (this.stat1) {
      case 'sprint_speed': 
      this.stat1CSV = 'assets/sprint_speed.csv'
      break;
      case 'oaa': 
      this.stat1CSV = 'assets/outs_above_average.csv'
    }
    switch (this.stat2) {
      case 'sprint_speed': 
      this.stat2CSV = 'assets/sprint_speed.csv'
      break;
      case 'oaa': 
      this.stat2CSV = 'assets/outs_above_average.csv'
    }
    this.http.get(this.stat1CSV, {responseType: 'text'})
    .subscribe(
        data => {
          let stat1Array = this.csvToJSON(data)
          this.http.get(this.stat2CSV, {responseType: 'text'})
          .subscribe(
            data => {
          let stat2Array = this.csvToJSON(data);
          let tempArray = stat2Array.filter((el) => {
            return stat1Array.some((p) => {
              return p.player_id === el.player_id
            })
          })
          tempArray.map((player:any) => {
            stat1Array.map((sp:any) => {
              if (player.player_id === sp.player_id) {
                player.oaa = sp.outs_above_average
              }
            })
          })
          this.graphData = tempArray;
          this.stat1Average = (tempArray.reduce((total, next) => total + parseInt(next.oaa), 0) / tempArray.length).toFixed(2);
          this.stat2Average = (tempArray.reduce((total, next) => total + parseInt(next.sprint_speed), 0) / tempArray.length).toFixed(2);
          this.resultsLength = tempArray.length
          this.graphArray = new MatTableDataSource(tempArray);
        }
    );
        }
    );

  }

  csvToJSON(data: any) {
    var lines= data.split("\n");
          var result = [];
          var headers=lines[0].split(",");

          for(var i=1;i<lines.length;i++){
            var obj: any = {};
            var currentline=lines[i].split(",");
            for(var j=0;j<headers.length;j++) { 
              obj[headers[j]] = currentline[j];
            }   
          result.push(obj);
          }
          return result; 
  }

  applyFilter(event: Event) {
    if ((event.target as HTMLInputElement).value.length > 0) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.graphArray.filter = filterValue.trim().toLowerCase();
    }
  }

}
