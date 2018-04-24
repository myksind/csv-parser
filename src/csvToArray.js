const csvToArray = text => {
  let p = '',
    row = [''],
    result = [row],
    i = 0,
    r = 0,
    double = true,
    letter;
  for (letter in text) {
    letter = text[letter];
    //Finds the beginning and ending of double quates and escapes
    if ('"' === letter) {
      if (double && letter === p) row[i] += letter;
      double = !double;
    }
    //Finds the comma separator and writes empty string at the end
    else if (',' === letter && double) letter = row[++i] = '';
    //Finds the ending line and starts new row
    else if ('\n' === letter && double) {
      if ('\r' === p) row[i] = row[i].slice(0, -1);
      row = result[++r] = [(letter = '')];
      i = 0;
    } else row[i] += letter;
    p = letter;
  }
  return result;
};

export default csvToArray;
