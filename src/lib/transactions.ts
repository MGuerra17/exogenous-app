import { CATEGORIES } from '@/constants/categories';
import { Transaction } from '@/interfaces/transaction';
import * as XLSX from 'xlsx-js-style';

const HEADER_STYLES = {
  border: {
    top: { style: 'thin', color: { auto: 1 } },
    right: { style: 'thin', color: { auto: 1 } },
    bottom: { style: 'thin', color: { auto: 1 } },
    left: { style: 'thin', color: { auto: 1 } }
  },
  font: { bold: true }
};

export function generateXLSXFile({ transactions }: { transactions: Transaction[] }) {
  const wsData = [
    ["NIT", "Nombre / Razón", "Detalle", "Valor", "Tipo"]
  ];
  
  const orderedTransactions = orderTransactionsByCategory(transactions);

  // Add transactions to the worksheet
  orderedTransactions.forEach((transaction) => {
    wsData.push([transaction.nit, transaction.name, transaction.detail, transaction.value.toString(), transaction.category ?? 'Otro'])
  })

  // Create the worksheet
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Add styles to the worksheet
  wsData.forEach((_, i) => {
    if (i === 0) {
      const headerRow = wsData[0];
      const columnWidths: { wch: number }[] = [];

      headerRow.forEach((_, colIndex) => {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIndex });
        const maxLength = getMaxColumnLength(wsData, colIndex);
        
        if (ws[cellAddress]) ws[cellAddress].s = HEADER_STYLES;
        
        columnWidths.push({ wch: maxLength + 5 });
      });

      ws['!cols'] = columnWidths;
      return
    }

    const category = wsData[i][4] as string;
    const color = CATEGORIES.find((c) => c.name === category)?.color ?? '#FFFFFF';
    
    for (let col = 0; col <= 4; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: i, c: col });
      if (!ws[cellAddress]) continue;
      ws[cellAddress].s = generateTransactionStyle(color);
      if (col === 3) {
        ws[cellAddress].t = 'n';
        ws[cellAddress].z = '"$"#,##0.00';
      }
    }
  });

  // Create the workbook
  const wb = XLSX.utils.book_new();
  
  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(wb, ws, "Data");

  // Write the workbook to a blob
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  return new Blob([wbout], { type: "application/octet-stream" });
}

function orderTransactionsByCategory(transactions: Transaction[]) {
  return transactions.sort((a, b) => {
    const orderA = CATEGORIES.find((c) => c.name === a.category)?.order ?? 6;
    const orderB = CATEGORIES.find((c) => c.name === b.category)?.order ?? 6;
    return orderA - orderB;
  });
}

function getMaxColumnLength(data: string[][], colIndex: number) {
  return data.reduce((max, row) => {
    const cell = row[colIndex];
    const length = cell ? cell.toString().length : 0;
    return length > max ? length : max;
  }, 10);
}

function generateTransactionStyle (color: string) {
  return ({
    fill: {
      patternType: 'solid',
      fgColor: { rgb: color }
    },
    border: {
      top: { style: 'thin', color: { auto: 1 } },
      right: { style: 'thin', color: { auto: 1 } },
      bottom: { style: 'thin', color: { auto: 1 } },
      left: { style: 'thin', color: { auto: 1 } }
    }
  });
};