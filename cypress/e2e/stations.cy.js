const { _ } = Cypress;

const toStrings = (cells) => _.map(cells, "textContent");

const getColumnValues = (elements) => {
  return cy.get(elements).then(toStrings);
};

const setInput = (filterName, value) => {
  cy.get(`input[name="${filterName}"]`).type(value).should("have.value", value);
};

describe("Stations", function () {
  beforeEach(function () {
    cy.visit("http://localhost:5173/stations");
    cy.intercept("GET", "/api/stations*").as("getStations");
    cy.wait("@getStations");
  });

  it("can be filtered", function () {
    const keyword = "kam";
    setInput("search", keyword);

    cy.wait("@getStations");

    cy.get("#stations > tr").each((row) => {
      const firstTdText = row.find("td").eq(0).text().toLowerCase();
      const secondTdText = row.find("td").eq(1).text().toLowerCase();

      cy.wrap(
        firstTdText.includes(keyword) || secondTdText.includes(keyword)
      ).should("be.true");
    });
  });

  it("redirects to station page on table element click", function () {
    let initialUrl;
    cy.url().then((url) => {
      initialUrl = url;
      cy.get("td")
        .first()
        .invoke("text")
        .then((text) => {
          cy.get("td").first().click();

          cy.url().should("not.eq", initialUrl);
          cy.contains(text);
        });
    });
  });

  it("map elemenets are visible", () => {
    cy.get("#map").should("be.visible");
    cy.get(".leaflet-draw-draw-circle").should("be.visible");
    cy.get(".leaflet-marker-icon").first().should("be.visible").click();
    cy.get(".leaflet-popup-content-wrapper").should("be.visible");
  });

  it("list of stations changes when drawing circle on the map", function () {
    // get original table values, draw circle and compare original values to new values
    getColumnValues("#stations > tr > td:nth-child(1)").then((names) => {
      getColumnValues("#stations > tr > td:nth-child(2)").then((addresses) => {
        cy.get(".leaflet-draw-draw-circle").first().click();

        cy.get("#map")
          .realMouseDown({ position: "center" })
          .realMouseMove(50, 50, { position: "center" })
          .realMouseUp();

        cy.wait("@getStations");

        getColumnValues("#stations > tr > td:nth-child(1)").then(
          (namesAfter) => {
            cy.wrap(namesAfter).should("not.deep.equal", names);
            getColumnValues("#stations > tr > td:nth-child(2)").then(
              (addressesAfter) => {
                cy.wrap(addressesAfter).should("not.deep.equal", addresses);
              }
            );
          }
        );
      });
    });
  });

  it("clearing circle should set table to initial state", function () {
    getColumnValues("#stations > tr > td:nth-child(1)").then((names) => {
      getColumnValues("#stations > tr > td:nth-child(2)").then((addresses) => {
        cy.get(".leaflet-draw-draw-circle").first().click();

        cy.get("#map")
          .realMouseDown({ position: "center" })
          .realMouseMove(50, 50, { position: "center" })
          .realMouseUp();

        cy.wait("@getStations");

        cy.get(".leaflet-draw-edit-remove").click();

        cy.get('a[title="Clear all layers"]').click();

        cy.wait("@getStations");

        getColumnValues("#stations > tr > td:nth-child(1)").then(
          (namesAfter) => {
            cy.wrap(namesAfter).should("deep.equal", names);
            getColumnValues("#stations > tr > td:nth-child(2)").then(
              (addressesAfter) => {
                cy.wrap(addressesAfter).should("deep.equal", addresses);
              }
            );
          }
        );
      });
    });
  });
});
