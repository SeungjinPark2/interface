import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as commonKo from "./translations/common/ko.json";

const resources = {
  ko: {
    common: commonKo,
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
