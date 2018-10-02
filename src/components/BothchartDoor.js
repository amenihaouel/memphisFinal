import React, { Component } from 'react';
import Chart from 'chart.js';
import './tempchart.css';
import * as moment from 'moment';

class BothChartDoor extends Component {

    state = {
        data: this.props.data.data.door,
        dataDoor: this.props.data.data.alert,
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
/*
            console.log('DOOR', this.state.dataDoor);
            const newData = [];
            this.state.dataDoor.data.forEach((event, i) => {
                (event.y === 1 || event.y === 'Ouverte') ? event.y = 'Ouverte' : event.y = 'Fermée';
                newData.push(event);
                // if (i < (this.state.dataDoor.data.length - 1) && this.state.dataDoor.data[i + 1].y !== this.state.dataDoor.data[i].y) {
                //     newData.push({ x: event.x, y: event.y });
                // }
            });
            console.log('NEW', newData)
            const newComponentData = this.state.dataDoor;
            newComponentData.data = newData;
            this.setState({ dataDoor: newComponentData });
*/
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
                    yAxisID: 'temp',
                    borderColor: '#0000FF',
                },
                {
                    data: this.state.dataDoor.data,
                    label: this.state.dataDoor.title,
                    fill: false,
                    yAxisID: 'door',
                    borderColor: '#ff0000',
                },
                ],
            },
            options: {
                scales: {
                    yAxes: [{
                        id: 'temp',
                        display: true,
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: maxYChart,
                        }
                    },
                    {
                        id: 'door',
                        display: true,
                        type: 'category',
                        labels: ['Ouverte', 'Fermée'],
                    },
                    ]
                },
                elements: {
                    line: {
                        tension: 0
                    }
                }
            }});
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

export default BothChartDoor;