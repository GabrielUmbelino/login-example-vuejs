// https://docs.cypress.io/api/introduction/api.html
context("Login", () => {

  beforeEach(() => {
    cy.visit("http://localhost:8080");
    cy.server();
  });

  const fillForm = (username, password) => {
    if (username) {
      cy.get("input[placeholder='USERNAME']").type(username);
    }
    if (password) {
      cy.get("input[placeholder='PASSWORD']").type(password);
    }
    cy.contains("Sign in").click();
  };

  describe("Login Test", () => {
    it("Empty fields error", () => {
      fillForm("", "");
      cy.contains("Username is required.");
      cy.contains("Password is required.");
    });

    it("Wrong credentials error", () => {
      cy.route({
        method: "POST",
        url: "**/verifyPassword?key=AIzaSyAh-m6zyRVNIg-VaVULyq6CkBao_ipZkY8",
        status: 400,
        response: {
          "error": {
            "code": 400,
            "message": "INVALID_EMAIL",
            "errors": [{
              "message": "INVALID_EMAIL",
              "domain": "global",
              "reason": "invalid"
            }]
          }
        },
        delay: 1,
        headers: {
          "X-Token": null
        }
      }).as("LoginError");

      fillForm("gabriel.f.umbelino@gmail.com", "123");
      cy.wait("@LoginError");
      cy.contains("Incorrect username or password.");
    });

    it("Success", () => {
      cy.route({
        method: "POST",
        url: "**/verifyPassword?key=AIzaSyAh-m6zyRVNIg-VaVULyq6CkBao_ipZkY8",
        status: 200,
        response: {
          "kind": "identitytoolkit#VerifyPasswordResponse",
          "localId": "CXVlfIAcuJbEFsn1QZf1lentBNX2",
          "email": "gabriel.f.umbelino@gmail.com",
          "displayName": "",
          "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImIyZTQ2MGZmM2EzZDQ2ZGZlYzcyNGQ4NDg0ZjczNDc2YzEzZTIwY2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXV0aC0xMDJhYSIsImF1ZCI6ImF1dGgtMTAyYWEiLCJhdXRoX3RpbWUiOjE1NDk0MTU5OTgsInVzZXJfaWQiOiJDWFZsZklBY3VKYkVGc24xUVpmMWxlbnRCTlgyIiwic3ViIjoiQ1hWbGZJQWN1SmJFRnNuMVFaZjFsZW50Qk5YMiIsImlhdCI6MTU0OTQxNTk5OCwiZXhwIjoxNTQ5NDE5NTk4LCJlbWFpbCI6ImdhYnJpZWwuZi51bWJlbGlub0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiZ2FicmllbC5mLnVtYmVsaW5vQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.UQf_XzpFjqurVYGOhpjmrVoYkuVrWy8BPKjmLqJtzZSZu77RcKyFeQ35qZ2GKi4-CwFkDEv8xe-LuLYe64tg0c3Azl04thpa50Bh4yP3JP5W6NVPcWGNi1ndctt7IV1h4XmSoCtD1eka6-63NiRbKpD2BlSvgv4l_CH3GEiNJ5JsA6TBsBNLIjKr3d9ZmRGCqvmwdkI1IGy9ZKjkl91DH_s8q32Vt4BDQ428nzN0CH6uYvVLRqKicHEu-2U-5rElajV5BWK8HnJOd_irqZSdPe9w6a4CXBOx4N0WkD5bjfuoGnM-IytmRQFVug8RouAnBGUIYFkufOz7s6U4eOzhVw",
          "registered": true,
          "refreshToken": "AGK09AMIByhwHQLEOlgmR62sJ_0YM2L-07R40WDqHH3NrThVpeMvPuGJFB9PuixtEdBSq4kPT8ytJ2r_czN2DoMJfK9thmHx8RcsWp9lGO5jIjkBXDX99NNSXyBrlsFnSGS-stHfDh-y4IsAkEkpPcsG3O4FJEaCtHCguoNJM7unUIB66jz2h2CgOXmZ7HTdOMKyGDPyPV6vXP6JIdzfBe-RTWjdyP8YHA",
          "expiresIn": "3600"
        },
        delay: 1,
        headers: {
          "X-Token": null
        }
      }).as("LoginSuccess");

      fillForm("gabriel.f.umbelino@gmail.com", "Gabriel30");
      cy.wait("@LoginSuccess");
      cy.contains("Hi you were successfully logged in.");
    });
  });
})