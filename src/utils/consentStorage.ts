const CONSENT_STORAGE_KEY = "user_consent";

export type ConsentInfo = {
  consented: boolean;
  timestamp: string;
};

export const saveConsentInfo = (consented: boolean): void => {
  if (!consented) return;

  try {
    const consentData: ConsentInfo = {
      consented: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consentData));
  } catch (error) {
    return;
  }
};

export const getConsentInfo = (): ConsentInfo | null => {
  try {
    const consentData = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!consentData) return null;

    const parsed = JSON.parse(consentData) as ConsentInfo;
    return parsed?.consented === true ? parsed : null;
  } catch (error) {
    return null;
  }
};

export const hasConsent = (): boolean => {
  return getConsentInfo() !== null;
};

export const removeConsentInfo = (): void => {
  try {
    localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch (error) {
    return;
  }
};
