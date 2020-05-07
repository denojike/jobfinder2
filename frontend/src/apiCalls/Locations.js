// const ld = require('countrycitystatejson');
import ld from 'countrycitystatejson';

class Locations {
  //get countries by code and by name
  static getCountriesByCodeAndName() {
    const countryArr = ld.getCountries();
    return countryArr.map(c => {
      const code = c.shortName;
      const name = c.name;
      return { code, name };
    });
  }

  //get countries by name
  static getCountriesByName() {
    const countryArr = ld.getCountries();
    return countryArr.map(c => c.name);
  }

  //get states in country
  static getStates(code) {
    const statesArr = ld.getStatesByShort(code);
    return statesArr;
  }

  //   //get cities in state
  static getCites(cShortName, state) {
    const citiesArr = ld.getCities(cShortName, state);
    return citiesArr;
  }

  //Get Cities grouped by State grouped by Countries
  static getFormatedLocation() {
    const countriesData = this.getCountriesByCodeAndName();
    const countryStates = countriesData.map(c => {
      const name = c.name;
      const code = c.code;
      const states = Locations.getStates(c.code);

      const stateCities = states.map(state => {
        const cities = Locations.getCites(c.code, state);
        return { state, cities };
      });

      return { name, code, stateCities };
    });
    return countryStates;
  }
}

export { Locations };
