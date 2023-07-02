module.exports = {
  clickElement: async function (page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector is not clickable: ${selector}`);
    }
  },

  checkRow: async function (page, rowNumber, rowNumberSelector) {
    try {
      await page.waitForSelector(rowNumberSelector, {
        visible: true,
      });
    } catch (error) {
      throw new Error(`Выбранный ряд ${rowNumber} не существует!`);
    }
  },

  checkPlace: async function (
    page,
    rowNumber,
    placeNumber,
    placeNumberSelector
  ) {
    try {
      await page.waitForSelector(placeNumberSelector, {
        visible: true,
      });
    } catch (error) {
      throw new Error(
        `Выбранное место ${placeNumber} не существует ${rowNumber}!`
      );
    }
  },

  checkBookButton: async function (
    page,
    bookButtonSelector,
    rowNumber,
    placeNumber
  ) {
    try {
      await page.waitForSelector(bookButtonSelector, {
        visible: true,
      });
      expect(
        await page.$eval(bookButtonSelector, (button) => {
          return button.disabled;
        })
      ).toBe(false);
    } catch (error) {
      throw new Error(
        `Выбранное место ${placeNumber} в ряду ${rowNumber} занято!`
      );
    }
  },

  checkPlaceAndRowOnTicket: async function (page, rowNumber, placeNumber) {
    await page.waitForSelector(
      "body > main > section > div > p:nth-child(2) > span",
      {
        visible: true,
      }
    );

    const actualRowAndPlace = await page.$eval(
      "body > main > section > div > p:nth-child(2) > span",
      (el) => el.textContent
    );
    expect(actualRowAndPlace).toContain(`${rowNumber}/${placeNumber}`);
  },

  checkTicket: async function (page, successMsg) {
    const ticket = await page.$eval(
      "body > main > section > header > h2",
      (el) => el.textContent
    );
    expect(ticket).toEqual(successMsg);
  },

  checkPlaceIsFree: async function (
    page,
    rowNumber,
    placeNumber,
    placeNumberSelector
  ) {
    try {
      const takenPlace = await page.$eval(
        placeNumberSelector,
        (el) => el.classList
      );
      expect(takenPlace).toEqual({
        0: "buying-scheme__chair",
        1: "buying-scheme__chair_standart",
      });
    } catch (error) {
      throw new Error(
        `Выбранное место ${placeNumber} в ряду ${rowNumber} занято!`
      );
    }
  },
  checkPlaceIsNotFree: async function (
    page,
    rowNumber,
    placeNumber,
    placeNumberSelector
  ) {
    try {
      const takenPlace = await page.$eval(
        placeNumberSelector,
        (el) => el.classList
      );
      expect(takenPlace).toEqual({
        0: "buying-scheme__chair",
        1: "buying-scheme__chair_standart",
        2: "buying-scheme__chair_taken",
      });
    } catch (error) {
      throw new Error(`Ошибка`);
    }
  },
};
