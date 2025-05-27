import { DictionaryTableImpl } from "../commonDb/DictionaryTable.js";
import { LogoTableImpl } from "../commonDb/LogoTable.js";
import { ZIconTableImpl } from "../commonDb/ZIconTable.js";
import { ZMapsCountryTableImpl } from "../commonDb/ZMapsCountryTable.js";
import { ZMapsDistrictTableImpl } from "../commonDb/ZMapsDistrictTable.js";
import { TABLE_KEY } from "../constants.js";
import { DbHelper } from "../parts/DbHelper.js";
var TABLE_NAME;
(function (TABLE_NAME) {
    TABLE_NAME["LOGO"] = "Logo";
    TABLE_NAME["ZICON"] = "ZIcon";
    TABLE_NAME["ZMAPS_COUNTRY"] = "ZMapsCountry";
    TABLE_NAME["ZMAPS_DISTRICT"] = "ZMapsDistrict";
    TABLE_NAME["ENGLISH_DICTIONARY"] = "EnglishDictionary";
})(TABLE_NAME || (TABLE_NAME = {}));
class CommonDbHelperInput {
    name = "Common";
    version = 1;
    tables = {
        [TABLE_NAME.LOGO]: TABLE_KEY.DOMAIN,
        [TABLE_NAME.ZICON]: "hostName",
        [TABLE_NAME.ZMAPS_COUNTRY]: "country",
        [TABLE_NAME.ZMAPS_DISTRICT]: "country_state",
        [TABLE_NAME.ENGLISH_DICTIONARY]: "word",
    };
}
export class CommonDbImpl {
    db = new DbHelper();
    ziconTable = new ZIconTableImpl();
    logoTable = new LogoTableImpl();
    zmapsCountryTable = new ZMapsCountryTableImpl();
    zmapsDistrictTable = new ZMapsDistrictTableImpl();
    dictionaryTable = new DictionaryTableImpl();
    async init() {
        try {
            await this.db.init(new CommonDbHelperInput());
            const initObjMapping = {
                [TABLE_NAME.LOGO]: this.logoTable,
                [TABLE_NAME.ZICON]: this.ziconTable,
                [TABLE_NAME.ZMAPS_COUNTRY]: this.zmapsCountryTable,
                [TABLE_NAME.ZMAPS_DISTRICT]: this.zmapsDistrictTable,
                [TABLE_NAME.ENGLISH_DICTIONARY]: this.dictionaryTable,
            };
            for (let tableName in initObjMapping) {
                initObjMapping[tableName].init({ db: this.db, name: tableName });
            }
        }
        catch (e) {
            logError(e);
        }
    }
}
