import type { Metadata } from "next";
import Link from "next/link";
import sharedStyles from "../../../shared.module.css";
import styles from "./sinai-gazlar.module.css";
import { gasesData } from "./gasesData";

export const metadata: Metadata = {
  title: "Sınai Gazlar | Tinsagaz Endüstriyel Çözümler",
  description:
    "Endüstriyel kesme, kaynak, tavlama, metalurji ve laboratuvar prosesleriniz için yüksek saflıkta sınai gaz çözümleri. Saf Argon, Endüstriyel Oksijen, Azot ve daha fazlası.",
};

export default function SinaiGazlarPage() {
  return (
    <>
      {/* Page Hero */}
      <section className={sharedStyles.pageHero} aria-label="Sınai Gazlar Başlık">
        <div className={sharedStyles.pageHeroInner}>
          <nav className={sharedStyles.pageBreadcrumb} aria-label="Sayfa konumu">
            <Link href="/" className={sharedStyles.pageBreadcrumbLink}>Anasayfa</Link>
            <span className={sharedStyles.pageBreadcrumbSep}>›</span>
            <Link href="/urunler" className={sharedStyles.pageBreadcrumbLink}>Ürünler</Link>
            <span className={sharedStyles.pageBreadcrumbSep}>›</span>
            <span>Sınai Gazlar</span>
          </nav>
          <h1 className={sharedStyles.pageHeroTitle}>Sınai Gazlar</h1>
          <p className={sharedStyles.pageHeroDesc}>
            Endüstriyel üretim süreçlerinizde yüksek verimlilik ve kalite sağlayan,
            uluslararası standartlarda üretilmiş sınai (endüstriyel) gazlarımız.
          </p>
        </div>
      </section>

      {/* Gases List Section */}
      <section className={styles.gasesSection} aria-label="Sınai gazlar ürün listesi">
        <div className={styles.grid}>
          {gasesData.map((gas) => (
            <article key={gas.slug} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.iconWrap} role="img" aria-label={gas.title}>
                  {gas.icon || "💨"}
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
                  href={`/urunler/gazlar/sinai-gazlar/${gas.slug}`}
                  id={`gas-link-${gas.slug}`}
                  className={styles.cardAction}
                >
                  Detayları İncele →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
