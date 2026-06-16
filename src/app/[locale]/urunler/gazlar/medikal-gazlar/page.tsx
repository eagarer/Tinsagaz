import type { Metadata } from "next";
import Link from "next/link";
import sharedStyles from "../../../shared.module.css";
import styles from "./medikal-gazlar.module.css";
import { getMedicalGasesData } from "./medikalData";
import { Locale, getDictionary } from "../../../dictionaries";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const dict = await getDictionary(currentLocale);

  return {
    title: `${dict.medicalGasesList.hero.title} | Tinsagaz`,
    description: dict.medicalGasesList.hero.desc,
  };
}

function getMedicalGasIcon(slug: string) {
  switch (slug) {
    case "medikal-oksijen-gazi":
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a5 5 0 0 0-5 5v3a5 5 0 0 0 10 0V7a5 5 0 0 0-5-5Z" />
          <path d="M7 14h10v3a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3v-3Z" />
          <circle cx="12" cy="7" r="1.2" fill="currentColor" />
        </svg>
      );
    case "azot-protoksit-gazi":
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
    case "medikal-kuru-hava-gazi":
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9.59 4.59A2 2 0 1 1 11 8H2M12.59 19.41A2 2 0 1 0 14 16H2M17.73 11.27A2.5 2.5 0 1 1 19.5 15H2" />
        </svg>
      );
    case "medikal-karbondioksit-gazi":
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5l-5 5-5-5M22 12H2M19 17l-5-5 5-5M5 17l5-5-5-5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      );
  }
}

export default async function MedikalGazlarPage({ params }: Props) {
  const { locale } = await params;
  const currentLocale = locale as Locale;
  const dict = await getDictionary(currentLocale);
  const localizedMedicalGases = getMedicalGasesData(currentLocale);

  const productsLabel = locale === "tr"
    ? "Ürünlerimiz"
    : locale === "en"
    ? "Our Products"
    : locale === "de"
    ? "Unsere Produkte"
    : locale === "fr"
    ? "Nos Produits"
    : locale === "it"
    ? "I Nostri Prodotti"
    : "製品紹介";

  return (
    <>
      {/* Page Hero */}
      <section className={sharedStyles.pageHero} aria-label="Medikal Gazlar Başlık">
        <div className={sharedStyles.pageHeroInner}>
          <nav className={sharedStyles.pageBreadcrumb} aria-label="Sayfa konumu">
            <Link href={`/${locale}`} className={sharedStyles.pageBreadcrumbLink}>{dict.nav.home}</Link>
            <span className={sharedStyles.pageBreadcrumbSep}>›</span>
            <Link href={`/${locale}/urunler`} className={sharedStyles.pageBreadcrumbLink}>{productsLabel}</Link>
            <span className={sharedStyles.pageBreadcrumbSep}>›</span>
            <span>{dict.medicalGasesList.hero.title}</span>
          </nav>
          <h1 className={sharedStyles.pageHeroTitle}>{dict.medicalGasesList.hero.title}</h1>
          <p className={sharedStyles.pageHeroDesc}>
            {dict.medicalGasesList.hero.desc}
          </p>
        </div>
      </section>

      {/* Gases List Section */}
      <section className={styles.gasesSection} aria-label="Medikal gazlar ürün listesi">
        <div className={styles.grid}>
          {localizedMedicalGases.map((gas) => (
            <article key={gas.slug} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.iconWrap} role="img" aria-label={gas.title}>
                  {getMedicalGasIcon(gas.slug)}
                </span>
                {gas.badge && <span className={styles.badge}>{gas.badge}</span>}
              </div>
              <div className={styles.cardBody}>
                <h2 className={styles.cardTitle}>{gas.title}</h2>
                <p className={styles.cardDesc}>{gas.desc}</p>
                
                {gas.features && (
                  <ul className={styles.featureList} role="list">
                    {gas.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className={styles.featureItem}>
                        <span className={styles.checkIcon}>✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={`/${locale}/urunler/gazlar/medikal-gazlar/${gas.slug}`}
                  id={`gas-link-${gas.slug}`}
                  className={styles.cardAction}
                >
                  {dict.medicalGasesList.detailAction}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
