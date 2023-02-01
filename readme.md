# Hand Method Arithmetic

Do you remember how we used to do basic calculation (addition, subtraction, multiplication and division) when we were little?
This module uses that method to do basic arithmetic.

1.  It can do addition, subtraction, multiplication and division.
2.  It can calculate negative numbers.
3.  It can calculate decimal numbers.
4.  It can do calculation of **very long digits (unlimited digits)**.
5.  It can do fractional calculation 100% accurately.

## Use method

- **Install it with `npm i handmath`**
- Import it using
  - ESmodule `import HandMath from 'handmath'`
  - CommonJs `const HandMath = require('handmath')`
- Do addition `let calc = new HandMath('534366567547574.357757574').add('754577.4775')`
  - This will add this perform addition.
- Do subtraction `calc.sub('46747.7457')`
  - This will subtract `46747.7457` number from the previous result.
- Do multiplication `calc.multiply('46747.7457')`
  - This will multiply the previous result by `46747.7457`.
- Do divison`calc.divide('46747.7457')`
  - This will divide the previous result by `46747.7457`.
  - By default, it will return 10 characters after decimal point. But if you want more pass a second argument in `.divide()` specifying the number of digits you want to get after decimal. Example: `new HandMath('10').divide('3', 1000)`, will return 1000 characters after decimal point.
- You can also do something like too: `new HandMath('1234').add('56').sub('78').multiply('44').divide('0.3654777')`
  - This will perform addition, then subtraction, then multiplication and then division.
- To get the result add **`.result`**
- **REMEMBER**
  - The numbers must be passed as a string because JS numbers can't handle very large number.
  - The output will be as string.

### If any bugs are found please inform me.
