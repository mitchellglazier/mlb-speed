import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss']
})
export class ScatterComponent implements OnInit {
  @Input() graphData: any;
  private svg: any;
  private margin = 50;
  private width = 600 - (this.margin * 2);
  private height = 450 - (this.margin * 2);

  constructor() { }

  ngOnInit(): void {
    this.graphData.map((player: any) => {
      player.name = player.first_name + " " + player.last_name
    })
    this.createSvg();
    this.drawPlot();
  }

  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + "," + this.margin + ")");
}

private drawPlot(): void {
  // Add X axis
  const x = d3.scaleLinear()
  .domain([26, 31])
  .range([ 0, this.width ]);
  this.svg.append("g")
  .attr("transform", "translate(0," + this.height + ")")
  .call(d3.axisBottom(x));

  // Add Y axis
  const y = d3.scaleLinear()
  .domain([-10, 20])
  .range([ this.height, 0]);
  this.svg.append("g")
  .call(d3.axisLeft(y));

  var tooltip = d3.select("body")
    .append("div")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background", "#000")
    .text("a simple tooltip");

  // Add dots
  const dots = this.svg.append('g');
  dots.selectAll("dot")
  .data(this.graphData)
  .enter()
  .append("circle")
  .attr("cx", (d: any) => x(d.sprint_speed))
  .attr("cy", (d: any) => y(d.oaa))
  .attr("r", 7)
  .style("opacity", 1)
  .style("fill", "#862633")

  // Add labels
  dots.selectAll("text")
  .data(this.graphData)
  .enter()
  .append("text")
  .text((d: any) => (d.name))
  .attr("x", (d: any) => x(d.sprint_speed))
  .attr("y", (d: any) => y(d.oaa))
  .style("fill", '#C4CED4')
  .style("font", "10px times")
}

}
