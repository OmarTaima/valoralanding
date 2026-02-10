import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "../i18n/hooks/useTranslation";
import { getProjects } from "../store/slices/projectsSlice";
import Footer from "../components/footer";

const Unit = () => {
  const { unitId } = useParams();
  const location = useLocation();
  const { t, isArabic } = useTranslation();
  const dispatch = useDispatch();
  const { rawProjects, loading: projectsLoading } = useSelector(
    (state) => state.projects
  );
  const [unit, setUnit] = useState(location.state?.unit || null);
  const [projectSlug, setProjectSlug] = useState(location.state?.projectSlug || "");
  const [projectName, setProjectName] = useState(location.state?.projectName || "");
  const [showPrices, setShowPrices] = useState(location.state?.showPrices ?? true);
  const [isLoading, setIsLoading] = useState(!location.state?.unit);
  const [error, setError] = useState(null);

  const [gallery, setGallery] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const getLocalizedText = (field) => {
    if (!field) return "";
    if (typeof field === "string") return field;
    if (typeof field === "object") return isArabic ? (field.ar || field.en || "") : (field.en || field.ar || "");
    return "";
  };

  useEffect(() => {
    // Dispatch Redux action to fetch projects (Redux will handle caching)
    if (!unit) {
      dispatch(getProjects());
    }
  }, [dispatch, unit]);

  useEffect(() => {
    // Find the unit from Redux projects
    if (projectsLoading) {
      setIsLoading(true);
      return;
    }

    if (rawProjects && rawProjects.length > 0 && !unit) {
      try {
        let found = null;
        for (const p of rawProjects) {
          if (!p.units) continue;
          const u = (p.units || []).find((x) => String(x._id) === String(unitId));
          if (u) {
            found = { unit: u, project: p };
            break;
          }
        }
        if (found) {
          setUnit(found.unit);
          setProjectSlug(found.project?.slug || "");
          setProjectName(getLocalizedText(found.project?.name) || "");
          setShowPrices(found.project?.showPrices ?? true);
        } else {
          setError(t('projectDetail:unitNotFound') || "Unit not found");
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error processing unit");
        setIsLoading(false);
      }
    } else if (!projectsLoading && !unit) {
      setIsLoading(false);
    }
  }, [rawProjects, unitId, unit, projectsLoading, isArabic]);

  useEffect(() => {
    if (!unit) return;
    const imgs = [
      ...(unit.planViewImages || unit.planGallery || unit.planGallery || []),
      ...(unit.currentImages || []),
      ...(unit.threeDImages || []),
      ...(unit.planViewImages || []),
    ];
    const unique = Array.from(new Set(imgs.filter(Boolean)));
    setGallery(unique);
    setActiveIndex(0);
  }, [unit]);

  // Scroll to top when entering the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [unitId]);

  const openLightboxAt = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const prev = (e) => { e?.stopPropagation(); setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length); };
  const next = (e) => { e?.stopPropagation(); setActiveIndex((i) => (i + 1) % gallery.length); };

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        <p className="mt-4">{t("projectDetail:loading") || "Loading..."}</p>
      </div>
    </div>
  );

  if (error || !unit) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{error || t('projectDetail:unitNotFound') || "Unit not found"}</h2>
        <Link to="/projects" className="btn-primary mt-4 inline-block">{t("projectDetail:backToProjects") || "Back to Projects"}</Link>
      </div>
    </div>
  );

  const area = unit.area || unit.size || unit.areaNumber || "-";
  const layout = getLocalizedText(unit.layout) || unit.layout || "-";
  const features = unit.features || [];

  return (
    <div className="min-h-screen bg-light-50 dark:bg-dark-900">
      <Helmet>
        <title>{projectName ? `${layout || 'Unit'} - ${projectName} - VALORA` : 'Unit Details - VALORA'}</title>
        <meta name="description" content={`View details of ${layout || 'this unit'} in ${projectName || 'our project'}. ${unit.type ? `Type: ${unit.type}` : ''}`} />
        <meta property="og:title" content={projectName ? `${layout || 'Unit'} - ${projectName} - VALORA` : 'Unit Details - VALORA'} />
        <meta property="og:description" content={`View details of ${layout || 'this unit'} in ${projectName || 'our project'}.`} />
        {gallery?.[0] && <meta property="og:image" content={gallery[0]} />}
      </Helmet>
      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-primary-300"
            aria-label="Close"
          >
            ✕
          </button>
          <button aria-label="prev" onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 text-white text-4xl">‹</button>
          <img src={gallery[activeIndex]} alt={`image ${activeIndex+1}`} className="max-w-full max-h-full object-contain" onClick={(e) => e.stopPropagation()} />
          <button aria-label="next" onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 text-white text-4xl">›</button>
        </div>
      )}

      {/* Header with Project Name */}
      <div className="bg-white dark:bg-dark-800 border-b border-light-200 dark:border-dark-700">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to={projectSlug ? `/projects/${projectSlug}` : '/projects'} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg shadow-md transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              {t('projectDetail:backToProject') || 'Back to Project'}
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-light-900 dark:text-white">{projectName || t('projectDetail:unitDetails') || 'Unit Details'}</h1>
              <p className="text-sm text-light-600 dark:text-light-400">{layout} • {unit.type}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: Gallery & description */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass rounded-2xl overflow-hidden">
              {gallery.length > 0 ? (
                <div className="relative cursor-pointer" onClick={() => openLightboxAt(activeIndex)}>
                  <img src={gallery[activeIndex]} alt={`Gallery ${activeIndex+1}`} className="w-full h-64 md:h-96 lg:h-[500px] object-cover" />
                  <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              ) : (
                <div className="w-full h-64 md:h-96 bg-light-100 dark:bg-dark-800 flex items-center justify-center">{t('projectDetail:noImages') || 'No images available'}</div>
              )}

              <div className="p-4 md:p-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl md:text-2xl font-bold text-light-900 dark:text-white">{layout}</h2>
                  <span className="px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-semibold">{unit.type}</span>
                </div>

                <p className="mt-3 text-light-700 dark:text-light-300">{unit.description || unit.notes || ''}</p>

                {/* thumbnails */}
                {gallery.length > 0 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {gallery.map((g, i) => (
                      <button key={i} onClick={() => setActiveIndex(i)} className={`flex-shrink-0 w-24 h-20 rounded overflow-hidden transition-all ${i === activeIndex ? 'ring-2 ring-primary-500 scale-105' : 'opacity-70 hover:opacity-100'}`}>
                        <img src={g} alt={`thumb ${i+1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Full details panel */}
            <div className="glass rounded-2xl p-4 md:p-6">
              <h3 className="text-xl font-bold mb-4 text-light-900 dark:text-white">{t('projectDetail:unitDetails') || 'Unit Details'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:area') || 'Area'}</div>
                    <div className="font-semibold text-light-900 dark:text-white">{area} {t('projectDetail:sqm') || 'm²'}</div>
                  </div>

                  <div>
                    <div className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:floor') || 'Floor'}</div>
                    <div className="font-semibold text-light-900 dark:text-white">{unit.floor || '-'}</div>
                  </div>

                  <div>
                    <div className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:view') || 'View'}</div>
                    <div className="font-semibold text-light-900 dark:text-white">{unit.view || '-'}</div>
                  </div>

                  <div>
                    <div className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:available') || 'Available'}</div>
                    <div className="font-semibold text-success-500">{unit.availableUnits || '-'}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {showPrices && (
                    <>
                      <div>
                        <div className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:pricePerSqm') || 'Price per m²'}</div>
                        <div className="font-semibold text-light-900 dark:text-white">{unit.pricePerMeterNum ? `${t('projectDetail:egp') || 'EGP'} ${parseInt(unit.pricePerMeterNum).toLocaleString()}` : (unit.unitTotalPriceNum ? `${t('projectDetail:egp') || 'EGP'} ${parseInt(unit.unitTotalPriceNum).toLocaleString()}` : (t('projectDetail:contactForPrice') || 'Contact for price'))}</div>
                      </div>

                      <div>
                        <div className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:totalPrice') || 'Total Price'}</div>
                        <div className="font-semibold text-light-900 dark:text-white">{unit.unitTotalPriceNum ? `${t('projectDetail:egp') || 'EGP'} ${parseInt(unit.unitTotalPriceNum).toLocaleString()}` : '-'}</div>
                      </div>
                    </>
                  )}

                  <div>
                    <div className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:layout') || 'Layout'}</div>
                    <div className="font-semibold text-light-900 dark:text-white">{layout}</div>
                  </div>

                  <div>
                    <div className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:type') || 'Type'}</div>
                    <div className="font-semibold text-light-900 dark:text-white">{unit.type || '-'}</div>
                  </div>
                </div>
              </div>

              {/* Payment details */}
              {showPrices && unit.payment && (unit.payment.deposit != null || unit.payment.installmentAmount != null || unit.payment.numberOfInstallments != null) && (
                <div className="mt-6 pt-6 border-t border-light-200 dark:border-dark-700">
                  <h4 className="text-lg font-semibold mb-3 text-light-900 dark:text-white">{t('projectDetail:paymentPlan') || 'Payment'}</h4>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:deposit') || 'Deposit'}</span>
                      <span className="font-semibold text-light-900 dark:text-white">{unit.payment.deposit != null ? `${t('projectDetail:egp') || 'EGP'} ${parseInt(unit.payment.deposit).toLocaleString()}` : '-'}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:installmentAmount') || 'Installment Amount'}</span>
                      <span className="font-semibold text-light-900 dark:text-white">{unit.payment.installmentAmount != null ? `${t('projectDetail:egp') || 'EGP'} ${parseInt(unit.payment.installmentAmount).toLocaleString()}` : '-'}</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:numberOfInstallments') || 'Number of Installments'}</span>
                      <span className="font-semibold text-light-900 dark:text-white">{unit.payment.numberOfInstallments != null ? unit.payment.numberOfInstallments : '-'}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Features */}
              {features.length > 0 && (
                <div className="mt-6 pt-6 border-t border-light-200 dark:border-dark-700">
                  <h4 className="text-lg font-semibold mb-3 text-light-900 dark:text-white">{t('projectDetail:features') || 'Features'}</h4>
                  <div className="flex flex-wrap gap-2">
                    {features.map((f, i) => (
                      <span key={i} className="px-3 py-1.5 bg-light-100 dark:bg-dark-800 text-light-900 dark:text-white rounded-lg text-sm">{getLocalizedText(f.name) || f}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Quick facts & CTA */}
          <div className="space-y-6">
            <div className="glass rounded-2xl p-4 md:p-6">
              <h4 className="text-lg font-semibold mb-4 text-light-900 dark:text-white">{t('projectDetail:quickInfo') || 'Quick Info'}</h4>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-light-200 dark:border-dark-700"><span className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:floor') || 'Floor'}</span><span className="font-semibold text-light-900 dark:text-white">{unit.floor || '-'}</span></div>
                <div className="flex justify-between py-2 border-b border-light-200 dark:border-dark-700"><span className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:area') || 'Area'}</span><span className="font-semibold text-light-900 dark:text-white">{area} {t('projectDetail:sqm') || 'm²'}</span></div>
                <div className="flex justify-between py-2 border-b border-light-200 dark:border-dark-700"><span className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:available') || 'Available'}</span><span className="font-semibold text-success-500">{unit.availableUnits || '-'}</span></div>
                <div className="flex justify-between py-2"><span className="text-sm text-light-600 dark:text-light-400">{t('projectDetail:view') || 'View'}</span><span className="font-semibold text-light-900 dark:text-white">{unit.view || '-'}</span></div>
              </div>
            </div>

            {(unit.planViewImages?.length > 0 || unit.planGallery?.length > 0 || unit.threeDImages?.length > 0) && (
              <div className="glass rounded-2xl p-4 md:p-6">
                <h4 className="text-lg font-semibold mb-4 text-light-900 dark:text-white">{t('projectDetail:plans') || 'Plans & 3D'}</h4>
                <div className="space-y-3">
                  {(unit.planViewImages || unit.planGallery || []).map((p, i) => (
                    <button key={i} onClick={() => { const idx = gallery.indexOf(p); if (idx >= 0) openLightboxAt(idx); else { setGallery((g)=>[p,...g]); setActiveIndex(0); openLightboxAt(0);} }} className="w-full rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
                      <img src={p} alt={`plan ${i+1}`} className="w-full h-32 object-cover rounded-lg" />
                    </button>
                  ))}
                  {(unit.threeDImages || []).map((p, i) => (
                    <button key={`3d-${i}`} onClick={() => { const idx = gallery.indexOf(p); if (idx >= 0) openLightboxAt(idx); else { setGallery((g)=>[p,...g]); setActiveIndex(0); openLightboxAt(0);} }} className="w-full rounded-lg overflow-hidden hover:opacity-90 transition-opacity">
                      <img src={p} alt={`3d ${i+1}`} className="w-full h-32 object-cover rounded-lg" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Unit;
