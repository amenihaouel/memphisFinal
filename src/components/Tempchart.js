import React, { Component } from 'react';
import Chart from 'chart.js';
import './tempchart.css';
import * as moment from 'moment';

class Tempchart extends Component {

    state = {
        data: this.props.data
    }

    componentDidMount = () => {

        //  Reset canvas dimensions
        const viewWidth = document.getElementById('root').clientWidth
        const canvasWidth = Math.round(0.8 * viewWidth) + 'px'
        document.getElementById('myChart').setAttribute('width', canvasWidth);

        // Set min and max
        let minY = Number(this.state.data.data[0].y);
        let maxY = Number(this.state.data.data[0].y);
        this.state.data.data.forEach((temp) => {
            if (Number(temp.y) < minY) {
                minY = Number(temp.y);
            }
            if (Number(temp.y) > maxY) {
                maxY = Number(temp.y);
            }
        });

        const minYChart = minY - 1;
        const maxYChart = maxY + 1;

        let yAxes = [{
            display: true,
            ticks: {
                suggestedMin: minYChart,
                suggestedMax: maxYChart,
            }
        }];

        if (this.state.data.type === 'door') {
            yAxes = [{
                type: 'category',
                labels: ['Ouverte', 'Fermée'],
            }];
            console.log('DOOR', this.state.data.data);
            const newData = [];
            this.state.data.data.forEach((event, i) => {
                (event.y === 1 || event.y === 'Ouverte') ? event.y = 'Ouverte': event.y = 'Fermée';
                newData.push(event);
                // if (i < (this.state.data.data.length - 1) && this.state.data.data[i + 1].y !== this.state.data.data[i].y) {
                //     newData.push({x: event.x, y:event.y});
                // }
            });
            console.log('NEW', newData)
            const newComponentData = this.state.data;
            newComponentData.data = newData
            this.setState({data: newComponentData});
        }

        // set time labels
        const customTimeLabels = [];
        this.state.data.data.forEach((temp) => {
            customTimeLabels.push(moment.unix(temp.x).format("HH:mm DD/MM"));
        });

        const ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: customTimeLabels,
                datasets: [{
                    data: this.state.data.data,
                    label: this.state.data.title,
                    fill: false,
                    borderColor: '#0000FF',
                }],
            },
            options: {
                scales: {
                    yAxes: yAxes,
                },
                elements: {
                    line: {
                        tension: 0
                    }
                }
            }
        });
    }

  render() {
      console.log(this.props.data);
    return (
      <div>
        <canvas id="myChart" width="800" height="400"></canvas>
      </div>
    )
  }
}

export default Tempchart;