/// <reference types="cypress" />

describe("Speaking page - simplified TTS checks (robust selectors)", () => {
  const SESSION_ENDPOINT = "/api/auth/login";
  const SPEAKING_ROUTE = "/learn/speaking";

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it("sends language 'english' and calls TTS for an English child", () => {
    cy.intercept("GET", SESSION_ENDPOINT, {
      statusCode: 200,
      body: {
        user: {
          id: 11,
          username: "child-en",
          accountType: "child",
          secondaryLang: "english",
          speakingLevel: 1,
        },
      },
    }).as("getSession");

    cy.intercept("POST", "/api/speaking/tts", (req) => {
      expect(req.body).to.have.property("language", "english");
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          audio: "UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=",
          mimeType: "audio/wav",
        },
      });
    }).as("ttsCall");

    cy.visit(SPEAKING_ROUTE);
    cy.wait("@getSession");

    // Click the first available level tile inside "Choose a Level"
    cy.contains("Choose a Level", { timeout: 10000 })
      .parents("div")
      .first()
      .within(() => {
        cy.get("button:enabled").first().click();
      });

    // Click the first lesson card in the lesson list (robust across locales)
    cy.contains("Choose a Lesson", { timeout: 5000 })
      .parents("div")
      .first()
      .within(() => {
        cy.get("button").filter(":visible").first().click();
      });

    cy.wait("@ttsCall");
  });

  it("sends language 'spanish' and calls TTS for a Spanish child", () => {
    cy.intercept("GET", SESSION_ENDPOINT, {
      statusCode: 200,
      body: {
        user: {
          id: 22,
          username: "child-es",
          accountType: "child",
          secondaryLang: "spanish",
          speakingLevel: 1,
        },
      },
    }).as("getSessionEs");

    cy.intercept("POST", "/api/speaking/tts", (req) => {
      expect(req.body).to.have.property("language", "spanish");
      req.reply({
        statusCode: 200,
        body: {
          success: true,
          audio: "UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABAAZGF0YQAAAAA=",
          mimeType: "audio/wav",
        },
      });
    }).as("ttsCallEs");

    cy.visit(SPEAKING_ROUTE);
    cy.wait("@getSessionEs");

    // Click the first level tile (robust)
    cy.contains("Choose a Level", { timeout: 10000 })
      .parents("div")
      .first()
      .within(() => {
        cy.get("button:enabled").first().click();
      });

    // Click the first lesson card in the lesson list (do NOT rely on English title)
    cy.contains("Choose a Lesson", { timeout: 5000 })
      .parents("div")
      .first()
      .within(() => {
        cy.get("button").filter(":visible").first().click();
      });

    cy.wait("@ttsCallEs");
  });
});
