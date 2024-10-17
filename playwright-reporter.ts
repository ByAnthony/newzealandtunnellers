import { FullConfig } from "@playwright/test";
import {
  FullResult,
  Reporter,
  Suite,
  TestCase,
  TestResult,
} from "@playwright/test/reporter";

class MyReporter implements Reporter {
  _testTotal: number;
  _counterLine: number;
  _counterTestExecuted: number;
  _counterSuccess: number;
  _counterFailure: number;
  _counterFlaky: number;

  constructor() {
    this._testTotal = 0;
    this._counterLine = 0;
    this._counterTestExecuted = 0;
    this._counterSuccess = 0;
    this._counterFailure = 0;
    this._counterFlaky = 0;
  }

  onBegin(config: FullConfig, suite: Suite) {
    this._testTotal = suite.allTests().length;
    console.log(
      `Running ${this._testTotal} test${this._testTotal > 1 ? "s" : ""} using ${config.workers} worker${config.workers > 1 ? "s" : ""}`,
    );
  }

  onTestEnd(test: TestCase, result: TestResult) {
    if (this._counterLine === 100) {
      this.printEndOfLine();
    }
    ++this._counterTestExecuted;
    ++this._counterLine;

    if (result.status === "skipped") {
      process.stdout.write("\x1b[33m°\x1b[39m");
      return;
    }

    if (test.outcome() === "unexpected" && result.retry < test.retries) {
      process.stdout.write(`\x1b[33mx\x1b[39m`);
      --this._counterTestExecuted;
      return;
    }

    switch (test.outcome()) {
      case "expected":
        process.stdout.write("\x1b[32m.\x1b[39m");
        ++this._counterSuccess;
        break;
      case "flaky":
        process.stdout.write("\x1b[33m±\x1b[39m");
        ++this._counterFlaky;
        break;
      case "unexpected":
        process.stdout.write(
          `\x1b[31m${result.status === "timedOut" ? "T" : "F"}(${
            test.annotations.find((annotation) => annotation.type === "Url")
              ? test.annotations.find((annotation) => annotation.type === "Url")
                  ?.description
              : test.title
          })\x1b[39m`,
        );
        this.printEndOfLine();
        ++this._counterFailure;
        break;
    }
  }

  onEnd(result: FullResult) {
    if (this._counterLine !== 0) this.printEndOfLine();
    console.log(`\nFinished the run: ${result.status}`);
    console.log(`\x1b[32mSuccess: ${this._counterSuccess}\x1b[39m`);
    console.log(`\x1b[33mFlaky: ${this._counterFlaky}\x1b[39m`);
    console.log(`\x1b[31mFailure: ${this._counterFailure}\x1b[39m`);
    if (process.env.CI)
      console.log(
        `See report here: ${process.env.CI_JOB_URL}/artifacts/file/playwright/out/report/index.html`,
      );
    else console.log("Run: npm run script show-report");
  }

  printEndOfLine() {
    process.stdout.write(`[${this._counterTestExecuted}/${this._testTotal}]\n`);
    this._counterLine = 0;
  }
}
export default MyReporter;
