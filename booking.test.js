let page;
const {
  clickElement,
  checkRow,
  checkPlace,
  checkBookButton,
  checkPlaceAndRowOnTicket,
  checkTicket,
  checkPlaceIsFree,
  checkPlaceIsNotFree,
} = require("./lib/commands.js");

const rowNumber = 9;
const placeNumber = 9;
const rowNumber2 = 8;
const placeNumber2 = 8;

const rowNumberSelector =
  "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
  rowNumber +
  ")";

const placeNumberSelector =
  "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
  rowNumber +
  ") > span:nth-child(" +
  placeNumber +
  ")";

const rowNumberSelector2 =
  "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
  rowNumber2 +
  ")";

const placeNumberSelector2 =
  "section > div.buying-scheme > div.buying-scheme__wrapper > div:nth-child(" +
  rowNumber2 +
  ") > span:nth-child(" +
  placeNumber2 +
  ")";

beforeEach(async () => {
  page = await browser.newPage();
});

afterEach(() => {
  page.close();
});

describe("Going to the cinema", () => {
  beforeEach(async () => {
    await page.goto("http://qamid.tmweb.ru/client/index.php", {
      waitUntill: "load",
      timeout: 50000,
    });
  });

  test("Booking one seat", async () => {
    await clickElement(page, "body > nav > a:nth-child(3)");
    await clickElement(
      page,
      "section:nth-child(2) > div.movie-seances__hall > ul > li"
    );
    await checkRow(page, rowNumber, rowNumberSelector);
    await checkPlace(page, rowNumber, placeNumber, placeNumberSelector);
    await clickElement(page, placeNumberSelector);
    await checkBookButton(
      page,
      "button.acceptin-button",
      rowNumber,
      placeNumber
    );
    await clickElement(page, "button.acceptin-button");
    await checkPlaceAndRowOnTicket(page, rowNumber, placeNumber);
    await clickElement(page, "button.acceptin-button");
    await checkTicket(page, "Электронный билет");
  }, 45000);

  test("Reservation two seat", async () => {
    await clickElement(page, "body > nav > a:nth-child(2)");
    await clickElement(
      page,
      "section:nth-child(2) > div.movie-seances__hall > ul > li"
    );
    await checkRow(page, rowNumber, rowNumberSelector);
    await checkPlace(page, rowNumber, placeNumber, placeNumberSelector);
    await checkRow(page, rowNumber2, rowNumberSelector2);
    await checkPlace(page, rowNumber2, placeNumber2, placeNumberSelector2);
    await checkPlaceIsFree(page, rowNumber, placeNumber, placeNumberSelector);
    await checkPlaceIsFree(
      page,
      rowNumber2,
      placeNumber2,
      placeNumberSelector2
    );
    await clickElement(page, placeNumberSelector);
    await clickElement(page, placeNumberSelector2);
    await checkBookButton(
      page,
      "button.acceptin-button",
      rowNumber,
      placeNumber
    );
    await clickElement(page, "button.acceptin-button");
    await checkPlaceAndRowOnTicket(page, rowNumber, placeNumber);
    await clickElement(page, "button.acceptin-button");
    await checkTicket(page, "Электронный билет");
  }, 45000);

  test("Can't buy a ticket with a taken seat", async () => {
    await clickElement(page, "body > nav > a:nth-child(3)");
    await clickElement(
      page,
      "section:nth-child(2) > div.movie-seances__hall > ul > li"
    );
    await checkRow(page, rowNumber, rowNumberSelector);
    await checkPlace(page, rowNumber, placeNumber, placeNumberSelector);
    await checkPlaceIsNotFree(
      page,
      rowNumber,
      placeNumber,
      placeNumberSelector
    );
  }, 45000);
});
