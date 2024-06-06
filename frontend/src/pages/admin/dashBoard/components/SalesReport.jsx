import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../../../Common/api';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SalesReport = ({ startDate, endDate }) => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get(`${URL}/salesReport`, {
          params: { startDate, endDate }
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

    doc.setFontSize(18);
    doc.text('Sales Report', 14, 22);

    const tableColumn = ['Course Name', 'Instructor Ref', 'Amount', 'Date'];
    const tableRows = [];

    salesData.forEach(sale => {
      const saleData = [
        sale.courseName,
        sale.instructorRef,
        sale.amount,
        new Date(sale.date).toLocaleDateString()
      ];
      tableRows.push(saleData);
    });

    doc.autoTable({
      startY: 30,
      head: [tableColumn],
      body: tableRows
    });

    doc.save('sales_report.pdf');
  };

  return (
    <div>
      <h1>Sales Report</h1>
      <button onClick={downloadPDF}>Download PDF</button>
    </div>
  );
};

export default SalesReport;
