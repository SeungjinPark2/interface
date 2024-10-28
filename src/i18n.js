import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as commonKo from "./translations/common/ko.json";
import * as remittanceKo from "./translations/remittance/ko.json";
import * as adminKo from "./translations/admin/ko.json";

const resources = {
  ko: {
    common: commonKo,
    remittance: remittanceKo,
    admin: adminKo,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ko",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
