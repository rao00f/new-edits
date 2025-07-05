import React, { createContext, useContext, useState, ReactNode } from 'react';

// Unify translation keys for type safety
const translationKeys = [
  'welcome', 'discoverEvents', 'featuredEvents', 'allEvents', 'noFeaturedEvents', 'noEventsAvailable',
  'profile', 'settings', 'logout', 'error', 'loading', 'bookings', 'events', 'government', 'schools',
  'clinics', 'occasions', 'entertainment', 'openings', 'free', 'bookNow', 'searchEvents', 'selectLanguage', 'currency'
] as const;
type TranslationKey = typeof translationKeys[number];

const translations = {
  ar: {
    welcome: 'مرحباً بك في Mi3AD',
    discoverEvents: 'اكتشف الفعاليات القريبة منك',
    featuredEvents: 'الفعاليات المميزة',
    allEvents: 'جميع الفعاليات',
    noFeaturedEvents: 'لا توجد فعاليات مميزة حالياً',
    noEventsAvailable: 'لا توجد فعاليات متاحة حالياً',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    error: 'خطأ',
    loading: 'جاري التحميل',
    bookings: 'الحجوزات',
    events: 'الفعاليات',
    government: 'حكومي',
    schools: 'مدارس',
    clinics: 'عيادات',
    occasions: 'مناسبات',
    entertainment: 'ترفيه',
    openings: 'افتتاحات',
    free: 'مجاني',
    bookNow: 'احجز الآن',
    searchEvents: 'ابحث عن الفعاليات',
    selectLanguage: 'اختر اللغة',
    currency: 'د.ل',
  },
  en: {
    welcome: 'Welcome to Mi3AD',
    discoverEvents: 'Discover events near you',
    featuredEvents: 'Featured Events',
    allEvents: 'All Events',
    noFeaturedEvents: 'No featured events available',
    noEventsAvailable: 'No events available',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    error: 'Error',
    loading: 'Loading',
    bookings: 'Bookings',
    events: 'Events',
    government: 'Government',
    schools: 'Schools',
    clinics: 'Clinics',
    occasions: 'Occasions',
    entertainment: 'Entertainment',
    openings: 'Openings',
    free: 'Free',
    bookNow: 'Book Now',
    searchEvents: 'Search events',
    selectLanguage: 'Select Language',
    currency: 'LYD',
  }
};

export type Locale = 'ar' | 'en';

interface SupportedLanguage {
  code: Locale;
  label: string;
  isRTL: boolean;
}

const supportedLanguages: SupportedLanguage[] = [
  { code: 'en', label: 'English', isRTL: false },
  { code: 'ar', label: 'العربية', isRTL: true },
];

interface I18nContextProps {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  isRTL: boolean;
  changeLanguage: (locale: Locale) => void;
  getSupportedLanguages: () => SupportedLanguage[];
}

const I18nContext = createContext<I18nContextProps | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Locale>('en');
  const isRTL = supportedLanguages.find(l => l.code === locale)?.isRTL || false;

  const t = (key: TranslationKey) => {
    // Fallback: current locale -> English -> key
    return translations[locale][key] || translations['en'][key] || key;
  };

  const changeLanguage = (newLocale: Locale) => setLocale(newLocale);
  const getSupportedLanguages = (): SupportedLanguage[] => supportedLanguages;

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, isRTL, changeLanguage, getSupportedLanguages }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
};
