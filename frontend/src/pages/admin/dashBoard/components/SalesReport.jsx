import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../../../Common/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';
const SalesReport = ({ startDate, endDate }) => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${URL}/course/enrollment/salesReport`, {
          params: { startDate, endDate },
        });
        setSalesData(response.data.data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, [startDate, endDate]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    let start=format(startDate, 'yyyy-MM-dd')
    let end=format(endDate, 'yyyy-MM-dd')
    console.log(start,end,'');
    doc.setFontSize(18);
    doc.text(`Sales Report ${start} to ${end}`, 14, 22);

    const tableColumns = ['Date', 'Amount', 'Courses', 'Instructor Ref'];
    const tableRows = [];

    let totalRevenue = 0; 
    salesData.forEach((sale) => {
      const saleDate = `${sale._id.year}-${sale._id.month}-${sale._id.day}`;
      const totalProfit = sale.totalProfit;
      totalRevenue += totalProfit;

      sale.courseDetails.forEach((course) => {
        const saleData = [saleDate, course.title, course.amount, course.instructorRef];
        tableRows.push(saleData);
      });
    });
    tableRows.push(['', '', 'Total Revenue:', totalRevenue]);

    doc.autoTable({
      startY: 30,
      head: [tableColumns],
      body: tableRows,
    });

    doc.save('sales_report.pdf');
  };

  return (
    <div className="flex justify-end">
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default SalesReport;
