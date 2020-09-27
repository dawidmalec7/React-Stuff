import React, { useContext, useState } from "react";

const pl = {
  attention: {
    title: "Dobrze, że jesteś, sprawdź to zadanie",
    subtitle: "Pomoże Ci ogarnąć jak zmieniać język w apkach reacta",
    ctaButton: "Dowiedź się więcej"
  },
  newsletter: {
    title: "Bądź na bieżąco",
    ctaButton: "Idź do repo ->",
    action: "/new-subscriber?lang=pl"
  }
};
const en = {
  attention: {
    title: "Hey, check this task",
    subtitle: "It can help You to learn how to change language in react app",
    ctaButton: "More"
  },
  newsletter: {
    title: "Let's keep in touch",
    ctaButton: "To repository !!!",
    action: "/new-subscriber?lang=en"
  }
};

const langs = {
  pl,
  en
};

const LangContext = React.createContext();

const LangContextProvider = ({ children }) => {
  const [lang, setLang] = useState("pl");
  const texts = langs[lang];
  return (
    <LangContext.Provider value={[lang, setLang, texts]}>
      {children}
    </LangContext.Provider>
  );
};

const LangChanger = ({ langs }) => {
  const [lang, setLang] = useContext(LangContext);
  return (
    <div>
      Current lang: {lang}
      {Object.keys(langs).map((lang) => (
        <button key={lang} onClick={() => setLang(lang)}>
          {lang}
        </button>
      ))}
    </div>
  );
};

const AttentionSection = ({ sectionName = "attention" }) => {
  const [, , texts] = useContext(LangContext);
  const { title, subtitle, ctaButton } = texts[sectionName];
  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <button>{ctaButton}</button>
    </div>
  );
};

const NewsletterSection = ({ sectionName = "newsletter" }) => {
  const [, , texts] = useContext(LangContext);
  const { title, ctaButton, action } = texts[sectionName];
  return (
    <form action={action}>
      <h1>{title}</h1>
      <button>{ctaButton}</button>
    </form>
  );
};

const multilangsComponent = () => {
  return (
    <div>
      <LangContextProvider>
        <LangChanger langs={langs} />
        <AttentionSection />
        <NewsletterSection />
      </LangContextProvider>
    </div>
  );
};

export default multilangsComponent;
