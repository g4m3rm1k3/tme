const assert = require("assert");
const render = require("../../render");

it("has a text input", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");

  assert(input);
});

it("Shows a success message with a valid email", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");
  input.value = "mikey@mikeymail.com";
  dom.window.document
    .querySelector("form")
    .dispatchEvent(new dom.window.Event("submit"));

  const h1 = dom.window.document.querySelector("h1");
  assert.strictEqual(h1.innerHTML, "Looks like an email address!");
});
it("Shows a fail message with a invalid email", async () => {
  const dom = await render("index.html");
  const input = dom.window.document.querySelector("input");
  input.value = "mikeymikeymail.com";
  dom.window.document
    .querySelector("form")
    .dispatchEvent(new dom.window.Event("submit"));

  const h1 = dom.window.document.querySelector("h1");
  assert.strictEqual(h1.innerHTML, "Not an email address!");
});
