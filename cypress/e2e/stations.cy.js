const setInput = (filterName, value) => {
  cy.get(`input[name="${filterName}"]`).type(value).should("have.value", value);
};

describe("Stations", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173/stations");
  });

  it("can be filtered", function () {
    const keyword = "kam";
    setInput("search", keyword);
    cy.wait(1000);
    cy.get("#stations > tr").each((row) => {
      const firstTdText = row.find("td").eq(0).text().toLowerCase();
      const secondTdText = row.find("td").eq(1).text().toLowerCase();

      cy.wrap(
        firstTdText.includes(keyword) || secondTdText.includes(keyword)
      ).should("be.true");
    });
  });
});
