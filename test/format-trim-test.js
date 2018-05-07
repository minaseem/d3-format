var tape = require("tape"),
    format = require("../");

tape("format(\"rt\") trims insignificant zeros", function(test) {
  var f = format.format("rt");
  test.equal(f(1), "1");
  test.equal(f(0.1), "0.1");
  test.equal(f(0.01), "0.01");
  test.equal(f(10.0001), "10.0001");
  test.equal(f(123.45), "123.45");
  test.equal(f(123.456), "123.456");
  test.equal(f(123.4567), "123.457");
  test.equal(f(0.000009), "0.000009");
  test.equal(f(0.0000009), "0.0000009");
  test.equal(f(0.00000009), "0.00000009");
  test.equal(f(0.111119), "0.111119");
  test.equal(f(0.1111119), "0.111112");
  test.equal(f(0.11111119), "0.111111");
  test.end();
});

tape("format(\"et\") trims insignificant zeros", function(test) {
  var f = format.format("et");
  test.equal(f(0), "0e+0");
  test.equal(f(42), "4.2e+1");
  test.equal(f(42000000), "4.2e+7");
  test.equal(f(0.042), "4.2e-2");
  test.equal(f(-4), "-4e+0");
  test.equal(f(-42), "-4.2e+1");
  test.end();
});

tape("format(\"st\") trims insignificant zeros", function(test) {
  var f = format.format("st");
  test.equal(f(0), "0");
  test.equal(f(1), "1");
  test.equal(f(10), "10");
  test.equal(f(100), "100");
  test.equal(f(999.5), "999.5");
  test.equal(f(999500), "999.5k");
  test.equal(f(1000), "1k");
  test.equal(f(1400), "1.4k");
  test.equal(f(1500), "1.5k");
  test.equal(f(1500.5), "1.5005k");
  test.equal(f(1e-15), "1f");
  test.equal(f(1e-12), "1p");
  test.equal(f(1e-9), "1n");
  test.equal(f(1e-6), "1µ");
  test.equal(f(1e-3), "1m");
  test.equal(f(1e0), "1");
  test.equal(f(1e3), "1k");
  test.equal(f(1e6), "1M");
  test.equal(f(1e9), "1G");
  test.equal(f(1e12), "1T");
  test.equal(f(1e15), "1P");
  test.end();
});

tape("format(\"%t\") trims insignificant zeros", function(test) {
  var f = format.format("%t");
  test.equal(f(0), "0%");
  test.equal(f(0.1), "10%");
  test.equal(f(0.01), "1%");
  test.equal(f(0.001), "0.1%");
  test.equal(f(0.0001), "0.01%");
  test.end();
});

tape("trimming respects commas", function(test) {
  var f = format.format(",gt");
  test.equal(f(10000.0), "10,000");
  test.equal(f(10000.1), "10,000.1");
  test.end();
});