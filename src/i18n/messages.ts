import type { Locale } from "./config";
import en from "./messages/en.json";
import de from "./messages/de.json";
import ja from "./messages/ja.json";
import es from "./messages/es.json";
import fr from "./messages/fr.json";
import pt from "./messages/pt.json";
import ko from "./messages/ko.json";

export type Messages = typeof en;

export const EN_MESSAGES: Messages = en;

const MESSAGES: Record<Locale, Messages> = {
  en,
  de: de as Messages,
  ja: ja as Messages,
  es: es as Messages,
  fr: fr as Messages,
  pt: pt as Messages,
  ko: ko as Messages,
};

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale] ?? EN_MESSAGES;
}

