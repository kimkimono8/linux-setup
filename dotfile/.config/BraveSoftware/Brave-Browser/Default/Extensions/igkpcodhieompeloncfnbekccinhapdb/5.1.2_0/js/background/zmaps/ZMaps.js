import { commonDb } from "../../src/bg/Context.js";
import { SessionStorageKeys } from "../../src/service/storage/constants/SessionStorageKeys.js";
export class ZMaps {
    mapsUrl;
    constructor() {
        this.init = js.fn.wrapper.createSingleInstance(this.init, this);
    }
    async init() {
        try {
            const initialized = await zsessionStorage.load(SessionStorageKeys.ZMAPS_INITIALIZED, false);
            this.mapsUrl = urlProvider.getZMapsUrl();
            if (initialized) {
                return;
            }
            const check = await commonDb.zmapsCountryTable.load("India");
            if (!Object.keys(check).length) {
                await this.fetchCountriesFromServer();
            }
            await zsessionStorage.save(SessionStorageKeys.ZMAPS_INITIALIZED, true);
        }
        catch (e) {
            logError(e);
        }
    }
    getZMapsCountryUrl() {
        return this.mapsUrl + "/v1/address/get_countries";
    }
    getZMapsStateUrl(country) {
        return this.mapsUrl + "/v1/address/get_states?country=" + country;
    }
    getZMapsDistrictUrl(country, state) {
        return this.mapsUrl + `/v1/address/get_districts?country=${country}&state=${state}`;
    }
    async fetchCountriesFromServer() {
        try {
            const response = await fetch(this.getZMapsCountryUrl());
            const data = await response.json();
            await commonDb.zmapsCountryTable.addAll(data.countries);
        }
        catch (e) {
            if (e instanceof TypeError) {
                return;
            }
            console.error(e);
        }
    }
    async getStates(country) {
        try {
            await this.init();
            const countryRow = await commonDb.zmapsCountryTable.load(country);
            if (!countryRow.states) {
                countryRow.states = await this.fetchStatesFromServer(country);
                this.saveStatesData(countryRow);
            }
            return countryRow.states;
        }
        catch (e) {
            console.error(e);
            return [];
        }
    }
    async fetchStatesFromServer(country) {
        try {
            const response = await fetch(this.getZMapsStateUrl(country));
            const statesData = await response.json();
            return statesData.data.map(data => data.state_name);
        }
        catch (e) {
            console.error(e);
            return [];
        }
    }
    async saveStatesData(countryRow) {
        if (countryRow.states.length) {
            await commonDb.zmapsCountryTable.addStates(countryRow);
        }
    }
    async getDistricts(country, state) {
        try {
            await this.init();
            const districtRow = await commonDb.zmapsDistrictTable.load(country, state);
            if (!districtRow.districts) {
                districtRow.districts = await this.fetchDistrictsFromServer(country, state);
                this.saveDistrictsData(country, state, districtRow.districts);
            }
            return districtRow.districts;
        }
        catch (e) {
            console.error(e);
            return [];
        }
    }
    async fetchDistrictsFromServer(country, state) {
        try {
            const response = await fetch(this.getZMapsDistrictUrl(country, state));
            const districtsData = await response.json();
            return districtsData.data.district;
        }
        catch (e) {
            console.error(e);
            return [];
        }
    }
    async saveDistrictsData(country, state, districts) {
        if (districts.length) {
            await commonDb.zmapsDistrictTable.addDistricts(country, state, districts);
        }
    }
    async saveCountryToDB(country) {
        await commonDb.zmapsCountryTable.addCustomCountry(country);
    }
    async saveStateToDB(country, state) {
        const countryRow = await commonDb.zmapsCountryTable.load(country);
        countryRow.states = countryRow.states ? countryRow.states : [];
        countryRow.states.push(state);
        await commonDb.zmapsCountryTable.addStates(countryRow);
    }
    async saveCityToDB(country, state, city) {
        const stateRow = await commonDb.zmapsDistrictTable.load(country, state);
        const districts = stateRow.districts ? stateRow.districts : [];
        districts.push(city);
        await commonDb.zmapsDistrictTable.addDistricts(country, state, districts);
    }
}
