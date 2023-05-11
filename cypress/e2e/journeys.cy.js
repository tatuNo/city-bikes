const { _ } = Cypress;

const setInput = (filterName, value) => {
  cy.get(`input[name="${filterName}"]`).type(value).should("have.value", value);
};

const applyFilters = () => {
  cy.contains("Apply").click();
};

describe("Journey filtering", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  const checkInputValue = (filterName, expectedValue) => {
    cy.get(`input[name="${filterName}"]`).should("have.value", expectedValue);
  };

  it("journeys page can be opened", function () {
    cy.contains("Filters");
  });

  it("journeys can be filtered by station name", function () {
    const keyword = "uimastadion";
    setInput("station", keyword);

    applyFilters();

    cy.get("#journeylist > tr").each((row) => {
      const firstTdText = row.find("td").eq(0).text().toLowerCase();
      const secondTdText = row.find("td").eq(1).text().toLowerCase();

      cy.wrap([firstTdText, secondTdText]).should("include", keyword);
    });
  });

  it("journeys can be filtered by distance", function () {
    setInput("minDistance", "15");
    setInput("maxDistance", "20");

    applyFilters();

    cy.get("#journeylist > tr > td:nth-child(3)").each((td) => {
      const text = td.text();
      cy.wrap(Number(text)).should("be.within", 15, 20);
    });
  });

  it("journeys can be filtered by duration", function () {
    setInput("minDuration", "15");
    setInput("maxDuration", "20");

    applyFilters();

    cy.get("#journeylist > tr > td:nth-child(4)").each((td) => {
      const text = td.text();
      cy.wrap(Number(text)).should("be.within", 15, 20);
    });
  });

  it("max distance is required if min distance is set", function () {
    setInput("minDistance", "15");

    applyFilters();
    cy.contains("Max distance required");
  });

  it("min distance is required if max distance is set", function () {
    setInput("maxDistance", "15");

    applyFilters();
    cy.contains("Min distance required");
  });

  it("max duration is required if min duration is set", function () {
    setInput("minDuration", "15");

    applyFilters();
    cy.contains("Max duration required");
  });

  it("min duration is required if max duration is set", function () {
    setInput("maxDuration", "15");

    applyFilters();
    cy.contains("Min duration required");
  });

  it("reset filters cleans the form", function () {
    setInput("minDistance", "15");
    setInput("maxDistance", "20");
    setInput("minDuration", "15");
    setInput("maxDuration", "20");
    setInput("station", "uimastadion");

    cy.contains("Reset filters").click();

    const expectedValue = "";
    checkInputValue("minDistance", expectedValue);
    checkInputValue("maxDistance", expectedValue);
    checkInputValue("minDuration", expectedValue);
    checkInputValue("maxDuration", expectedValue);
    checkInputValue("station", expectedValue);
  });
});

describe("Journeys sorting", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173");
  });

  const toStrings = (cells) => _.map(cells, "textContent");
  const toNumbers = (cells) => _.map(cells, Number);

  const sortColumn = (column) => {
    cy.contains(column).click();
  };

  const getColumnValues = (elements) => {
    return cy.get(elements).then(toStrings).then(toNumbers);
  };

  it("first click on distance sorts descending", function () {
    // apply some filters to have vary in distance
    setInput("minDistance", 20);
    setInput("maxDistance", 21);
    applyFilters();

    sortColumn("Distance (km)");

    getColumnValues("#journeylist > tr > td:nth-child(3)").then((values) => {
      const sorted = _.sortBy(values);
      cy.wrap(values).should("deep.equal", sorted);
    });
  });

  it("two clicks on distance sorts ascending", function () {
    sortColumn("Distance (km)");
    sortColumn("Distance (km)");

    getColumnValues("#journeylist > tr > td:nth-child(3)").then((values) => {
      const sorted = _.sortBy(values).reverse();

      cy.wrap(values).should("deep.equal", sorted);
    });
  });

  it("first click on duration sorts descending", function () {
    sortColumn("Duration (min)");
    getColumnValues("#journeylist > tr > td:nth-child(4)").then((values) => {
      const sorted = _.sortBy(values);

      cy.wrap(values).should("deep.equal", sorted);
    });
  });

  it("two clicks on duration sorts ascending", function () {
    sortColumn("Duration (min)");
    sortColumn("Duration (min)");

    getColumnValues("#journeylist > tr > td:nth-child(4)").then((values) => {
      const sorted = _.sortBy(values).reverse();

      cy.wrap(values).should("deep.equal", sorted);
    });
  });
});
