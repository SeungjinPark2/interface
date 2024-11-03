import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as commonKo from "./translations/common/ko.json";
import * as remittanceKo from "./translations/remittance/ko.json";
import * as adminKo from "./translations/admin/ko.json";
import * as commonMx from "./translations/common/mx.json";
import * as remittanceMx from "./translations/remittance/mx.json";
import * as adminMx from "./translations/admin/mx.json";
import * as commonUs from "./translations/common/us.json";
import * as remittanceUs from "./translations/remittance/us.json";
import * as adminUs from "./translations/admin/us.json";
import * as stepKo from "./translations/step/ko.json";
import * as stepUs from "./translations/step/us.json";
import * as stepMx from "./translations/step/mx.json";

const resources = {
  ko: {
    common: commonKo,
    remittance: remittanceKo,
    admin: adminKo,
    step: stepKo,
  },
  mx: {
    common: commonMx,
    remittance: remittanceMx,
    admin: adminMx,
    step: stepMx,
  },
  us: {
    common: commonUs,
    remittance: remittanceUs,
    admin: adminUs,
    step: stepUs,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: import.meta.env.VITE_LANG ?? "ko",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
