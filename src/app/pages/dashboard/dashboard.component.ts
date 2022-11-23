import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['first_name', 'last_name', 'team', 'sprint_speed', 'oaa'];
  graphArray!: MatTableDataSource<any>;
  graphData: any;
  sprintAverage!: string;
  outAverage!: number;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get('assets/outs_above_average.csv', {responseType: 'text'})
    .subscribe(
        data => {
          let OAAArray = this.csvToJSON(data)
          this.http.get('assets/sprint_speed.csv', {responseType: 'text'})
          .subscribe(
            data => {
          let speedArray = this.csvToJSON(data);
          let tempArray = speedArray.filter((el) => {
            return OAAArray.some((p) => {
              return p.player_id === el.player_id
            })
          })
          tempArray.map((player:any) => {
            OAAArray.map((sp:any) => {
              if (player.player_id === sp.player_id) {
                player.oaa = sp.outs_above_average
              }
            })
          })
          this.graphData = tempArray;
          this.sprintAverage = (tempArray.reduce((total, next) => total + parseInt(next.sprint_speed), 0) / tempArray.length).toFixed(2);
          this.outAverage = Math.round(tempArray.reduce((total, next) => total + parseInt(next.oaa), 0) / tempArray.length);
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
