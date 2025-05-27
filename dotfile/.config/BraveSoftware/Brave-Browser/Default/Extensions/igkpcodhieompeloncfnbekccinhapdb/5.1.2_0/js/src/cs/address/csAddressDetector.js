import { frameUrls } from "../../../common/enum/frameUrls.js";
import { setGlobal } from "../../../common/global/global.js";
import { CSFormDetector } from "../../../content_scripts/formFilling/csFormDetector.js";
import { VtSettings } from "../../service/vt/constants/VtSettings.js";
export var AddressFields;
(function (AddressFields) {
    AddressFields["FIRSTNAME"] = "FIRSTNAME";
    AddressFields["MIDDLENAME"] = "MIDDLENAME";
    AddressFields["LASTNAME"] = "LASTNAME";
    AddressFields["NAME"] = "NAME";
    AddressFields["ADDRESS1"] = "ADDRESS1";
    AddressFields["ADDRESS2"] = "ADDRESS2";
    AddressFields["ADDRESS3"] = "ADDRESS3";
    AddressFields["MOBILE"] = "MOBILE";
    AddressFields["CITY"] = "CITY";
    AddressFields["ZIP"] = "ZIP";
    AddressFields["STATE"] = "STATE";
    AddressFields["COUNTRY"] = "COUNTRY";
})(AddressFields || (AddressFields = {}));
export class CSAddressDetector extends CSFormDetector {
    firstName = new RegExp(/.*first.*name|initials|fname|first$|vorname|nombre|forename|prénom|prenom|名|nome|Имя|이름/, 'i');
    lastName = new RegExp(/.*last.*name|lname|surname|last$|secondname|nachname|apellido|famille|^nom|cognome|姓|morada|apelidos|surename|sobrenome|Фамилия|성[^명]?/, 'i');
    middleName = new RegExp(/.*middle.*name|mname|middle$|apellido.?materno/, 'i');
    name = new RegExp(/.*name|full.?name|your.?name|customer.?name|firstandlastname|bill.?name|ship.?name/, 'i');
    mobile = new RegExp(/.*phone|mobile|telefonnummer|telefono|teléfono|telfixe|電話|telefone|telemovel|телефон|电话|(전화|핸드폰|휴대폰|휴대전화)(.?번호)?/, 'i');
    address1 = new RegExp(/.*address.*line.?1|address.?1|addr1|street|area|strasse|straße|hausnummer|housenumber|house.?name|direccion|dirección|adresse|indirizzo|住所1|morada|endereço|Адрес|地址|주소.?1/, 'i');
    address2 = new RegExp(/.*address.*line.?2|address2|addr2|locality|suite|unit|adresszusatz|ergänzende.?angaben|direccion2|colonia|adicional|addresssuppl|complementnom|appartement|indirizzo2|住所2|complemento|addrcomplement|Улица|地址2|주소.?2/, 'i');
    address3 = new RegExp(/.*address.*line3|address3|addr3|landmark|line3|municipio|batiment|residence|indirizzo3/, 'i');
    city = new RegExp(/.*city|town|\\bort\\b|stadt|suburb|ciudad|provincia|localidad|poblacion|ville|commune|localita|市区町村|cidade|Город|市|分區|^시[^도·・]|시[·・]?군[·・]?구/, 'i');
    state = new RegExp(/^(?!.*country.*)(?!.*united.*state)(.*state|county|.*region|province|land|county|principality|都道府県|estado|provincia|область|省|地區|^시[·・]?도)/, 'i');
    zip = new RegExp(/.*zip|pin.?code|postal.?code|^-$|post2|codpos2/, 'i');
    country = new RegExp(/.*country.*|countries|location|país|pais|国|国家|국가|나라/, 'i');
    attributeName = "data-zvault-address";
    formAttribute = "data-zvault-address-form";
    frameUrl = frameUrls.ADDRESS_FRAME;
    async populateVaultIcons() {
        const disableVaultIcons = await zlocalStorage.load(VtSettings.DISABLE_WEBSITE_VAULT_ICON, false);
        if (disableVaultIcons) {
            return;
        }
        const inputFields = $("input:not([type=hidden],[type=radio],[type=checkbox],[type=file])");
        const selectFields = $("select:not([type=hidden])");
        const textareaFields = $("textarea");
        $.merge(selectFields, inputFields);
        $.merge(textareaFields, inputFields);
        const add1 = await this.detectFields(textareaFields, this.address1, AddressFields.ADDRESS1, false);
        const city = await this.detectFields(selectFields, this.city, AddressFields.CITY, false);
        const zip = await this.detectFields(inputFields, this.zip, AddressFields.ZIP, false);
        const state = await this.detectFields(selectFields, this.state, AddressFields.STATE, false);
        if (add1.length + city.length + zip.length + state.length < 4) {
            this.removeCustomAttributes(true);
            return;
        }
        this.detectFields(textareaFields, this.address2, AddressFields.ADDRESS2, false);
        this.detectFields(textareaFields, this.address3, AddressFields.ADDRESS3, false);
        this.detectFields(selectFields, this.country, AddressFields.COUNTRY, false);
        const firstName = await this.detectFields(inputFields, this.firstName, AddressFields.FIRSTNAME, false);
        if (firstName.length == 0) {
            this.detectFields(inputFields, this.name, AddressFields.NAME, false);
        }
        else {
            this.detectFields(inputFields, this.middleName, AddressFields.MIDDLENAME, false);
            this.detectFields(inputFields, this.lastName, AddressFields.LASTNAME, false);
        }
        this.detectFields(inputFields, this.mobile, AddressFields.MOBILE, false);
        this.fillVaultIconInFields();
    }
    fillVaultIconInFields() {
        for (let index = 0; index < this.formIndex; index++) {
            const attribute = this.attributeName + '-parent=ccform' + index;
            const ccfields = $('input[' + attribute + '], textarea[' + attribute + ']');
            for (let ccElement of ccfields) {
                if (ccElement.type.toLowerCase() == 'button' || ccElement.type.toLowerCase() == "submit") {
                    continue;
                }
                this.fillVaultIcon(ccElement, true);
            }
        }
    }
}
export const csAddressDetector = new CSAddressDetector();
setGlobal("csAddressDetector", csAddressDetector);
