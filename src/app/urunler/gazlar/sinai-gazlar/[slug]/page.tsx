import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import sharedStyles from "../../../../shared.module.css";
import styles from "../sinai-gazlar.module.css";
import { gasesData } from "../gasesData";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return gasesData.map((gas) => ({
    slug: gas.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gas = gasesData.find((g) => g.slug === slug);
  
  if (!gas) {
    return {
      title: "Gaz Bulunamadı | Tinsagaz",
    };
  }

  return {
    title: `${gas.title} | Sınai Gazlar | Tinsagaz`,
    description: gas.desc,
  };
}

export default async function GasDetailPage({ params }: Props) {
  const { slug } = await params;
  const gas = gasesData.find((g) => g.slug === slug);

  if (!gas) {
    notFound();
  }

  return (
    <>
      {/* Page Hero */}
      <section className={sharedStyles.pageHero} aria-label={`${gas.title} Tanıtımı`}>
        <div className={sharedStyles.pageHeroInner}>
          <nav className={sharedStyles.pageBreadcrumb} aria-label="Sayfa konumu">
            <Link href="/" className={sharedStyles.pageBreadcrumbLink}>Anasayfa</Link>
            <span className={sharedStyles.pageBreadcrumbSep}>›</span>
            <Link href="/urunler" className={sharedStyles.pageBreadcrumbLink}>Ürünler</Link>
            <span className={sharedStyles.pageBreadcrumbSep}>›</span>
            <Link href="/urunler/gazlar/sinai-gazlar" className={sharedStyles.pageBreadcrumbLink}>Sınai Gazlar</Link>
            <span className={sharedStyles.pageBreadcrumbSep}>›</span>
            <span>{gas.title}</span>
          </nav>
          {gas.badge && <span className={styles.badge} style={{ marginBottom: "16px", display: "inline-block" }}>{gas.badge}</span>}
          <h1 className={sharedStyles.pageHeroTitle}>{gas.title}</h1>
          <p className={sharedStyles.pageHeroDesc}>{gas.desc}</p>
        </div>
      </section>

      {/* Main Details Section */}
      <section className={styles.detailContainer} aria-label={`${gas.title} Ürün Detayları`}>
        {/* Left Column: Descriptions and Applications */}
        <div className={styles.mainContent}>
          {/* Product Description Block */}
          {gas.content && (
            <article className={styles.sectionBlock}>
              <h2 className={styles.blockTitle}>Ürün Açıklaması</h2>
              <p style={{ color: "var(--gray-600)", lineHeight: "1.8", fontSize: "1rem" }}>
                {gas.content}
              </p>
            </article>
          )}

          {/* Features Block */}
          {gas.features && (
            <article className={styles.sectionBlock}>
              <h2 className={styles.blockTitle}>Öne Çıkan Özellikler</h2>
              <ul className={styles.featureList} role="list" style={{ marginTop: "16px" }}>
                {gas.features.map((feat, idx) => (
                  <li key={idx} className={styles.featureItem} style={{ fontSize: "0.98rem" }}>
                    <span className={styles.checkIcon} style={{ fontSize: "1.1rem" }}>✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </article>
          )}

          {/* Usage Areas Block */}
          {gas.usageAreas && (
            <article className={styles.sectionBlock}>
              <h2 className={styles.blockTitle}>Kullanım Alanları</h2>
              <div className={styles.usageGrid}>
                {gas.usageAreas.map((area, idx) => (
                  <div key={idx} className={styles.usageItem}>
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Supply Models Block */}
          {gas.supplyModels && (
            <article className={styles.sectionBlock}>
              <h2 className={styles.blockTitle}>Tedarik ve Depolama Modelleri</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "24px" }}>
                {gas.supplyModels.map((model, idx) => (
                  <div key={idx} className={styles.supplyModelItem}>
                    <h3 className={styles.supplyModelTitle}>{model.title}</h3>
                    <p className={styles.supplyModelDesc}>{model.desc}</p>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* Safety Warning Block */}
          {gas.safetyWarning && (
            <div className={styles.warningBox}>
              <span className={styles.warningTitle}>⚠️ Güvenlik Standardı</span>
              <p>{gas.safetyWarning}</p>
            </div>
          )}
        </div>

        {/* Right Column: Specs and Call to Action */}
        <aside className={styles.sidebar}>
          {/* Specifications Block */}
          {gas.specifications && (
            <div className={styles.sectionBlock}>
              <h2 className={styles.blockTitle}>Teknik Özellikler</h2>
              <table className={styles.specTable}>
                <tbody>
                  {gas.specifications.map((spec, idx) => (
                    <tr key={idx} className={styles.specRow}>
                      <th className={styles.specLabel}>{spec.label}</th>
                      <td className={styles.specValue}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Contact / Get Quote Widget */}
          <div className={styles.ctaWidget}>
            <h3>Teklif Alın</h3>
            <p>
              {gas.title} ürünü için özel fiyat ve tedarik koşullarını öğrenmek üzere hızlıca teklif isteyebilirsiniz.
            </p>
            <Link
              href="/iletisim"
              id="get-quote-button"
              className="btn btn-white"
              style={{ width: "100%", justifyContent: "center" }}
            >
              İletişime Geçin
            </Link>
          </div>
        </aside>
      </section>
    </>
  );
}
