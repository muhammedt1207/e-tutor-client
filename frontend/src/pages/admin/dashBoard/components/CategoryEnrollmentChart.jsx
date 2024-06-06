import React, { useEffect, useRef, useState } from 'react';

const CategoryEnrollmentChart = ({ enrollmentsData }) => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
    console.log(enrollmentsData);
  useEffect(() => {
    const prepareChartData = () => {
      if (enrollmentsData.length > 0) {
        const categoryCounts = enrollmentsData.reduce((acc, enrollment) => {
          const category = enrollment[0];
          const count = enrollment[1];
          acc[category] = (acc[category] || 0) + count;
          return acc;
        }, {});

        // Convert category counts to an array suitable for the chart
        const chartDataArray = Object.entries(categoryCounts).map(([category, count]) => [category, count]);
        setChartData([['Category', 'Enrollments'], ...chartDataArray]);
      }
    };

    prepareChartData();
  }, [enrollmentsData]);

  useEffect(() => {
    if (chartRef.current && chartData.length > 0) {
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(drawChart);
    }
  }, [chartData]);

  const drawChart = () => {
    const data = google.visualization.arrayToDataTable(chartData);

    const options = {
      title: 'Category-Wise Enrollments',
      pieHole: 0.4, // Adjust pie hole size for donut chart
      is3D: true, // Optional: Add 3D effect for visual interest
      legend: { position: 'bottom' },
    };

    const chart = new google.visualization.PieChart(chartRef.current);
    chart.draw(data, options);
  };

  return <div ref={chartRef} style={{ height: '400px', width: '100%' }} />;
};

export default CategoryEnrollmentChart;