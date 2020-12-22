import { Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import numeral from 'numeral';


const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        }
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: 'index',
        intersect: false,
        callbacks: {
            label: (tooltipItem, data) => {
                return numeral(tooltipItem.value).format('+0.0');
            }
        }
    },

    scales: {
        xAxes: [{
            type: 'time',
            time: {
                format: 'MM/DD/YY',
                tooltipFormat: 'll'
            }
        }],

        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: (value, index, values) => {
                        return numeral(value).format('0a');
                    }

                }
            }
        ]

    }
}

const Linegraph = () => {
    const [data, setData] = useState();
    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => response.json())
            .then(data => {
                const chartData = buildChartData(data);
                setData(chartData);
            })
            .catch()
    }, [])

    const buildChartData = (data, caseType = 'cases') => {
        const chartData = [];
        let lastDataPoint;
        for (const [date, cases] of Object.entries(data[caseType])) {
            if (lastDataPoint) {
                const newDataPoint = {
                    x: date,
                    y: cases - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = cases;
        }
        return chartData.splice(-14);
    }

    return (
        <div className="linegraph">
            { data?.length > 0 && <Line
                data={{
                    datasets: [{
                        backgroundColor: 'rgba(204, 16, 52, 0.6)',
                        borderColor: '#cc1034',
                        data
                    }]
                }}

                options={options}
            />}
        </div>
    );
}

export default Linegraph;