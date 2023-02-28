import assert from "node:assert";
import { it } from "node:test";
import fs from 'fs';
import { converter } from "./converter";

const tests = [
  { initial: "simple.css", expected: "simple_expected.css" },
  { initial: "advanced.css", expected: "advanced_expected.css" },
];

tests.forEach(({ initial, expected }) => {
  it(`converts ${initial} file into ${expected}`, () => {
    const expectedResult = fs.readFileSync(`colors/${expected}`, "utf-8");
    const actualResult = converter(`colors/${initial}`);
    assert.deepEqual(actualResult, expectedResult)
  })
})

