import calculator from "calculator";

describe("calculator", () => {
    it("sum n1 + n2", () => {
        expect(calculator.sum(1, 2)).toBe(3);
    });
    it("sub n1 - n2", () => {
        expect(calculator.sub(3, 2)).toBe(1);
    });
    it("div n1 / n2", () => {
        expect(calculator.div(8, 4)).toBe(2);
    });
    it("mul n1 * n2", () => {
        expect(calculator.mul(3, 3)).toBe(9);
    });
});