import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Highcharts, { color } from 'highcharts';
import { TextField, Button } from '@mui/material';

const AnalyticsView = ({ invoices }) => {
    const [chartData, setChartData] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        generateChartData();
    }, [invoices]);

    useEffect(() => {
        filterChartData();
    }, [searchValue]);

    const generateChartData = () => {
        const distributionChannels = invoices.reduce((channels, invoice) => {
            const { distributionChannel, amountInUsd } = invoice;
            if (channels[distributionChannel]) {
                channels[distributionChannel] += amountInUsd;
            } else {
                channels[distributionChannel] = amountInUsd;
            }
            return channels;
        }, {});

        const formattedData = Object.entries(distributionChannels).map(([channel, amount]) => ({
            name: channel,
            y: amount,
        }));
        setChartData(formattedData);
    };

    const filterChartData = () => {
        const filtered = chartData.filter(data => data.name.toLowerCase().includes(searchValue.toLowerCase()));
        setFilteredData(filtered);
    };

    useEffect(() => {
        const chartOptions = {
            chart: {
                type: 'column',
                backgroundColor: 'none',
                height: 400,
            },
            title: {
                text: 'Total Amount per Distribution Channel',
                style: {
                    color: 'white',
                },
            },
            xAxis: {
                type: 'category',
                labels: {
                    style: {
                        color: 'white',
                    },
                },
            },
            yAxis: {
                title: {
                    text: 'Total Amount',
                    style: {
                        color: 'white',
                    },
                },
                labels: {
                    style: {
                        color: 'white',
                    },
                },
            },
            series: [
                {
                    name: "Total Amount",
                    data: filteredData,
                    // color: 'white', 
                },
            ],
            legend: {
                itemStyle: {
                    color: 'white',
                },
            },
        };

        const chart = Highcharts.chart('chart-container', chartOptions);

        return () => {
            chart.destroy();
        };
    }, [filteredData]);

    const handleSearchChange = event => {
        setSearchValue(event.target.value);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginBottom: '140px' }}>
                <div style={{ color: 'white', textAlign: "left", padding: "20px", fontSize: "18px" }}>Input Dist Channel</div>
                <TextField
                    label="Search Distribution Channel"
                    variant="outlined"
                    fullWidth
                    value={searchValue}
                    onChange={handleSearchChange}
                    sx={{ marginBottom: '10px' }}
                />
            </div>
            <div id="chart-container" style={{ flex: 1, padding: '20px', height: 'auto' }}></div>
        </div>
    );

};

AnalyticsView.propTypes = {
    invoices: PropTypes.arrayOf(
        PropTypes.shape({
            distributionChannel: PropTypes.string,
            amountInUsd: PropTypes.number,
        })
    ).isRequired,
};

export default AnalyticsView;
