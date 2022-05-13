// src/test/test.ts
var success = (message) => console.log("\u2705:" + message);
var _Test = class {
  constructor(name, run) {
    _Test.count++;
    const fail = (message) => {
      throw new Error("\u274C:" + name + ":" + message);
    };
    try {
      run(fail);
      success(name);
    } catch (exception) {
      fail(exception.message);
    }
  }
};
var Test = _Test;
Test.count = 0;

// src/test/test-test.ts
new Test("test", () => {
});

// src/test/runner.ts
console.log(`${Test.count} test(s) passed`);
