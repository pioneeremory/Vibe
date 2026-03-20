export function parseCSV(str) {
  const result = [];
  let row = [];
  let token = "";
  let inQuotes = false;
  
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    let nextChar = str[i+1];
    
    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        token += '"';
        i++; 
      } else if (char === '"') {
        inQuotes = false;
      } else {
        token += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(token);
        token = "";
      } else if (char === '\n' || char === '\r') {
        if (char === '\r' && nextChar === '\n') {
          i++; 
        }
        row.push(token);
        token = "";
        result.push(row);
        row = [];
      } else {
        token += char;
      }
    }
  }
  
  if (token !== "" || row.length > 0) {
    row.push(token);
    result.push(row);
  }
  
  if (result.length < 2) return [];
  
  const headers = result[0];
  return result.slice(1).map(r => {
    let obj = {};
    headers.forEach((h, idx) => {
      if (h) obj[h.trim()] = r[idx] ? r[idx].trim() : '';
    });
    return obj;
  }).filter(obj => Object.keys(obj).some(k => obj[k] !== ''));
}
