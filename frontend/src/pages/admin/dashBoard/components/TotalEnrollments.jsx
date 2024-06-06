import React, { useEffect, useRef } from 'react';
import { Chart } from 'react-google-charts';

const TotalEnrollments = ({ enrollmentsData }) => {
  const chartRef = useRef(null);
console.log(enrollmentsData,'----');
  useEffect(() => {
    const drawEnrollmentChart = () => {
      const data = new google.visualization.DataTable();
      data.addColumn('string', 'Date');
      data.addColumn('number', 'Enrollments');
      data.addRows(enrollmentsData);

      const options = {
        title: 'Enrollments Over Time',
        curveType: 'function',
        legend: { position: 'bottom' },
      };

      const chart = new google.visualization.LineChart(chartRef.current);
      chart.draw(data, options);
    };

    if (chartRef.current && enrollmentsData.length > 0) {
      google.charts.load('current', { packages: ['corechart'] });
      google.charts.setOnLoadCallback(drawEnrollmentChart);
    }
  }, [enrollmentsData]);

  return <div className=' h-96' ref={chartRef} />;
};

export default TotalEnrollments;
