const csvToArray = text => {
  let p = '',
    row = [''],
    result = [row],
    i = 0,
    r = 0,
    double = true,
    maxLength = 0,
    letter;

  for (let index in text) {
    letter = text[index];
    //Finds the beginning and ending of double quates and escapes
    if ('"' === letter) {
      if (double && letter === p) row[i] += letter;
      double = !double;
    }
    //Handles empty spaces
    else if (' ' === letter && double) row[i] += letter;
    //Finds the comma separator and writes empty string at the end
    else if (',' === letter && double) letter = row[++i] = '';
    //Finds the ending line and starts new row
    else if ('\n' === letter && double) {
      if (text.length - 1 + '' !== index) row = result[++r] = [(letter = '')];
      i = 0;
    } else row[i] += letter;
    p = letter;
  }
  const max = result.reduce((acu, current) => {
    return Math.max(acu, current.length);
  }, 0);

  return result.map(row => {
    if (row.length !== max) {
      for (let b = 0; b < max - row.length; b++) {
        row.push('');
      }
    }
    return row;
  });
};

const testCases = [
  ['a,b,c \n d,e,f', [['a', 'b', 'c '], [' d', 'e', 'f']]],
  ['a,b,c \n d,e,f\n', [['a', 'b', 'c '], [' d', 'e', 'f']]],
  ['a,b,c \n d,e', [['a', 'b', 'c '], [' d', 'e', '']]],
  ['"a",b,"c" \n d,e,f', [['a', 'b', 'c '], [' d', 'e', 'f']]],
  ['"a","b \nh","c" \n "d","e","f"', [['a', 'b h', 'c '], [' d', 'e', 'f']]],
  ['"a","b"""" h","c" \n "d","e","f"', [['a', 'b"" h', 'c '], [' d', 'e', 'f']]]
];

const compare = (input, output) => {
  if (JSON.stringify(input) !== JSON.stringify(output)) {
    console.log('Expected', input);
    console.log('Ouput', output);
    console.log('fail');
  }
};

const test = () => {
  testCases.forEach(([input, output]) => compare(output, csvToArray(input)));
};

test();

// export default csvToArray;

// 1.  Each record is located on a separate line, delimited by a line
//        break (CRLF).  For example:

//        aaa,bbb,ccc CRLF
//        zzz,yyy,xxx CRLF

//    2.  The last record in the file may or may not have an ending line
//        break.  For example:

//        aaa,bbb,ccc CRLF
//        zzz,yyy,xxx

//    3.  There maybe an optional header line appearing as the first line
//        of the file with the same format as normal record lines.  This
//        header will contain names corresponding to the fields in the file
//        and should contain the same number of fields as the records in
//        the rest of the file (the presence or absence of the header line
//        should be indicated via the optional "header" parameter of this
//        MIME type).  For example:

//        field_name,field_name,field_name CRLF
//        aaa,bbb,ccc CRLF
//        zzz,yyy,xxx CRLF

//    4.  Within the header and each record, there may be one or more
//        fields, separated by commas.  Each line should contain the same
//        number of fields throughout the file.  Spaces are considered part
//        of a field and should not be ignored.  The last field in the
//        record must not be followed by a comma.  For example:

//        aaa,bbb,ccc

//    5.  Each field may or may not be enclosed in double quotes (however
//        some programs, such as Microsoft Excel, do not use double quotes
//        at all).  If fields are not enclosed with double quotes, then
//        double quotes may not appear inside the fields.  For example:

//        "aaa","bbb","ccc" CRLF
//        zzz,yyy,xxx

//    6.  Fields containing line breaks (CRLF), double quotes, and commas
//        should be enclosed in double-quotes.  For example:

//        "aaa","b CRLF
//        bb","ccc" CRLF
//        zzz,yyy,xxx

//    7.  If double-quotes are used to enclose fields, then a double-quote
//        appearing inside a field must be escaped by preceding it with
//        another double quote.  For example:

//        "aaa","b""bb","ccc"
