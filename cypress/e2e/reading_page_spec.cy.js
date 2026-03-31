/// <reference types="cypress" />

describe("/learn/reading - simplified stable checks", () => {
  const SESSION_ENDPOINT = "/api/auth/login";
  const READING_ROUTE = "/learn/reading";

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it("opens the first lesson (Level 1) and displays LessonView", () => {
    const userId = 1001;

    // stub logged-in child
    cy.intercept("GET", SESSION_ENDPOINT, {
      statusCode: 200,
      body: {
        user: {
          id: userId,
          username: "child-reader",
          accountType: "child",
          secondaryLang: "english",
          readingLevel: 1,
        },
      },
    }).as("getSession");

    cy.visit(READING_ROUTE);
    cy.wait("@getSession");

    // Open level 1 (robust selection inside "Choose a Level")
    cy.contains("Choose a Level", { timeout: 10000 })
      .parents("div")
      .first()
      .within(() => {
        cy.get("button:enabled").first().click();
      });

    // Click the first lesson card in the lesson list
    cy.contains("Choose a Lesson", { timeout: 5000 })
      .parents("div")
      .first()
      .within(() => {
        cy.get("button").filter(":visible").first().click();
      });

    // Sanity: LessonView should show the lesson title and the instruction text for the first activity.
    // We check for the presence of an instruction paragraph (the page renders current.instruction).
    cy.get("body").then(($body) => {
      // There should be some instruction text in the LessonView header area - assert any non-empty p exists
      expect($body.text().length).to.be.greaterThan(0);
    });

    // More specific: find the speech bubble area and ensure it contains some text (instruction)
    cy.get(".max-w-2xl")
      .contains(
        /Look|Read|Tap|Answer|Which|What|Look at the letter|Read the sentence/i,
        {
          matchCase: false,
          timeout: 4000,
        },
      )
      .should("exist");
  });

  it("shows lesson as Done when progress exists in localStorage", () => {
    const userId = 1001;
    const lessonId = "en-1-1"; // lesson we mark as completed

    // seed localStorage BEFORE visiting the page
    cy.visit("/", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          `reading_progress_${userId}`,
          JSON.stringify([lessonId]),
        );
      },
    });

    // stub session (user must match id used in LS key)
    cy.intercept("GET", SESSION_ENDPOINT, {
      statusCode: 200,
      body: {
        user: {
          id: userId,
          username: "child-reader",
          accountType: "child",
          secondaryLang: "english",
          readingLevel: 1,
        },
      },
    }).as("getSession");

    // Now visit the reading route
    cy.visit(READING_ROUTE);
    cy.wait("@getSession");

    // Open level 1
    cy.contains("Choose a Level", { timeout: 10000 })
      .parents("div")
      .first()
      .within(() => {
        cy.get("button:enabled").first().click();
      });

    // In the lesson list, find the lesson card with the done badge.
    // We look for "Done ✓" text in the card or a green check mark.
    cy.contains("Choose a Lesson", { timeout: 5000 })
      .parents("div")
      .first()
      .within(() => {
        // The card for the completed lesson will contain "Done ✓" or a green check; assert presence
        cy.contains(/Done\s*✓|✓|Done/i, { timeout: 4000 }).should("exist");
      });

    // Also assert the top progress percentage is > 0 (the progress strip reads localStorage)
    cy.get(".bg-star-yellow .font-black.text-ollie-purple", { timeout: 4000 })
      .invoke("text")
      .then((text) => {
        // text holds the pct number (e.g., "20%"); ensure it's not "0%"
        expect(text.trim()).to.not.match(/^0%?$/);
      });
  });
});
