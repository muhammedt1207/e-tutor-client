// import React, { useRef } from 'react';
// import PDFDocument from 'pdfkit';
// import { Stream } from 'stream';
// import fs from 'fs';
// import winnersImg from '../assets/success.jpg';
// import { Buffer } from 'buffer';
// window.Buffer = Buffer;

// const CertificatePDF = () => {
//   const pdfRef = useRef(null);

//   const generatePDF = () => {
//     const doc = new PDFDocument({
//       layout: 'landscape',
//       size: 'A4',
//     });

//     // Helper to move to next line
//     function jumpLine(lines) {
//       for (let index = 0; index < lines; index++) {
//         doc.y += linkHeight * lines;
//           }
//     }

//     doc.registerFont('NotoSansJPLight', NotoSansJPLight);
//     doc.registerFont('NotoSansJPRegular', NotoSansJPRegular);
//     doc.registerFont('NotoSansJPBold', NotoSansJPBold);

//     const stream = doc.pipe(new Stream.PassThrough());

//     doc.rect(0, 0, doc.page.width, doc.page.height).fill('#fff');

//     doc.fontSize(10);

//     // Margin
//     const distanceMargin = 18;

//     doc
//       .fillAndStroke('#0e8cc3')
//       .lineWidth(20)
//       .lineJoin('round')
//       .rect(
//         distanceMargin,
//         distanceMargin,
//         doc.page.width - distanceMargin * 2,
//         doc.page.height - distanceMargin * 2,
//       )
//       .stroke();

//     // Header
//     const maxWidth = 140;
//     const maxHeight = 70;

//     doc.image(winnersImg, doc.page.width / 2 - maxWidth / 2, 60, {
//       fit: [maxWidth, maxHeight],
//       align: 'center',
//     });

//     jumpLine(5);

//     doc
//       .font('NotoSansJPLight')
//       .fontSize(10)
//       .fill('#021c27')
//       .text('Super Course for Awesomes', {
//         align: 'center',
//       });

//     jumpLine(2);

//     // Content
//     doc
//       .font('NotoSansJPRegular')
//       .fontSize(16)
//       .fill('#021c27')
//       .text('CERTIFICATE OF COMPLETION', {
//         align: 'center',
//       });

//     jumpLine(1);

//     doc
//       .font('NotoSansJPLight')
//       .fontSize(10)
//       .fill('#021c27')
//       .text('Present to', {
//         align: 'center',
//       });

//     jumpLine(2);

//     doc
//       .font('NotoSansJPBold')
//       .fontSize(24)
//       .fill('#021c27')
//       .text('STUDENT NAME', {
//         align: 'center',
//       });

//     jumpLine(1);

//     doc
//       .font('NotoSansJPLight')
//       .fontSize(10)
//       .fill('#021c27')
//       .text('Successfully completed the Super Course for Awesomes.', {
//         align: 'center',
//       });

//     jumpLine(7);

//     doc.lineWidth(1);

//     // Signatures
//     const lineSize = 174;
//     const signatureHeight = 390;

//     doc.fillAndStroke('#021c27');
//     doc.strokeOpacity(0.2);

//     const startLine1 = 128;
//     const endLine1 = 128 + lineSize;
//     doc
//       .moveTo(startLine1, signatureHeight)
//       .lineTo(endLine1, signatureHeight)
//       .stroke();

//     const startLine2 = endLine1 + 32;
//     const endLine2 = startLine2 + lineSize;
//     doc
//       .moveTo(startLine2, signatureHeight)
//       .lineTo(endLine2, signatureHeight)
//       .stroke();

//     const startLine3 = endLine2 + 32;
//     const endLine3 = startLine3 + lineSize;
//     doc
//       .moveTo(startLine3, signatureHeight)
//       .lineTo(endLine3, signatureHeight)
//       .stroke();

//     doc
//       .font('NotoSansJPBold')
//       .fontSize(10)
//       .fill('#021c27')
//       .text('John Doe', startLine1, signatureHeight + 10, {
//         columns: 1,
//         columnGap: 0,
//         height: 40,
//         width: lineSize,
//         align: 'center',
//       });

//     doc
//       .font('NotoSansJPLight')
//       .fontSize(10)
//       .fill('#021c27')
//       .text('Associate Professor', startLine1, signatureHeight + 25, {
//         columns: 1,
//         columnGap: 0,
//         height: 40,
//         width: lineSize,
//         align: 'center',
//       });

//     doc
//       .font('NotoSansJPBold')
//       .fontSize(10)
//       .fill('#021c27')
//       .text('Student Name', startLine2, signatureHeight + 10, {
//         columns: 1,
//         columnGap: 0,
//         height: 40,
//         width: lineSize,
//         align: 'center',
//       });

//     doc
//       .font('NotoSansJPLight')
//       .fontSize(10)
//       .fill('#021c27')
//       .text('Student', startLine2, signatureHeight + 25, {
//         columns: 1,
//         columnGap: 0,
//         height: 40,
//         width: lineSize,
//         align: 'center',
//       });

//     doc
//       .font('NotoSansJPBold')
//       .fontSize(10)
//       .fill('#021c27')
//       .text('Jane Doe', startLine3, signatureHeight + 10, {
//         columns: 1,
//         columnGap: 0,
//         height: 40,
//         width: lineSize,
//         align: 'center',
//       });

//     doc
//       .font('NotoSansJPLight')
//       .fontSize(10)
//       .fill('#021c27')
//       .text('Director', startLine3, signatureHeight + 25, {
//         columns: 1,
//         columnGap: 0,
//         height: 40,
//         width: lineSize,
//         align: 'center',
//       });

//     jumpLine(4);

//     // Validation link
//     const link =
//       'https://validate-your-certificate.hello/validation-code-here';

//     const linkWidth = doc.widthOfString(link);
//     const linkHeight = doc.currentLineHeight();

//     doc
//       .underline(
//         doc.page.width / 2 - linkWidth / 2,
//         448,
//         linkWidth,
//         linkHeight,
//         { color: '#021c27' },
//       )
//       .link(
//         doc.page.width / 2 - linkWidth / 2,
//         448,
//         linkWidth,
//         linkHeight,
//         link,
//       );

//     doc
//       .font('NotoSansJPLight')
//       .fontSize(10)
//       .fill('#021c27')
//       .text(
//         link,
//         doc.page.width / 2 - linkWidth / 2,
//         448,
//         linkWidth,
//         linkHeight
//       );

//     // Footer
//     const bottomHeight = doc.page.height - 100;

//     doc.image(qrImg, doc.page.width / 2 - 30, bottomHeight, {
//       fit: [60, 60],
//     });

//     doc.end();

//     stream.on('finish', () => {
//       const pdfBlob = new Blob([fs.readFileSync('certificate.pdf')], { type: 'application/pdf' });
//       const pdfUrl = URL.createObjectURL(pdfBlob);
//       pdfRef.current.href = pdfUrl;
//       pdfRef.current.download = 'certificate.pdf';
//     });
//   };

//   return (
//     <div>
//       <button onClick={generatePDF}>Download Certificate</button>
//       <a ref={pdfRef} style={{ display: 'none' }} />
//     {/* </div> */}
//   );
// };

// export default CertificatePDF;