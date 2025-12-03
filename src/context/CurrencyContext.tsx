import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CurrencyContextType {
  currency: string;
  conversionRate: number;
  formatPrice: (kes: number) => string; // base price is KES
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "KES",
  conversionRate: 1,
  formatPrice: (kes) => `KSH ${kes.toLocaleString()}`,
});

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState("KES");
  const [conversionRate, setConversionRate] = useState(1); // 1 KES = 1 KES by default

  useEffect(() => {
    async function detectCurrency() {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (data.country === "KE") {
          // KES user
          setCurrency("KES");
          setConversionRate(1); // KES base
        } else {
          // Other countries, convert from KES to USD
          setCurrency("USD");
          setConversionRate(0.0077); // example: 1 KES = 0.0077 USD
        }
      } catch {
        setCurrency("KES");
        setConversionRate(1);
      }
    }
    detectCurrency();
  }, []);

  const formatPrice = (priceKES: number) => {
    const converted = priceKES * conversionRate;
    return new Intl.NumberFormat(
      currency === "KES" ? "en-KE" : "en-US",
      {
        style: "currency",
        currency,
        minimumFractionDigits: 0,
      }
    ).format(converted);
  };

  return (
    <CurrencyContext.Provider value={{ currency, conversionRate, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
