import Hero from '@/components/Hero';
import SiteImage from '@/components/SiteImage';
import MarqueeBar from '@/components/MarqueeBar';
import CategoryCards from '@/components/CategoryCards';
import FeaturedProducts from '@/components/FeaturedProducts';
import RitualSplit from '@/components/RitualSplit';
import Reviews from '@/components/Reviews';
import AboutCta from '@/components/AboutCta';
import EmailSignup from '@/components/EmailSignup';
import { formatMoney } from '@/lib/format';
import { getProduct } from '@/lib/store';

export const metadata = {
  title: 'The J Effect | Mindful Skincare Rituals — Made in the USA',
  description: 'Discover The J Effect: clean skincare rituals crafted in the USA. Shop moisturizers, serums, cleansers and ritual bars for luminous, confident skin.',
};

export default async function HomePage() {
  const HERO_PRODUCT = await getProduct('hyaluronic-acid-serum');
  return (
    <>
      <Hero
        eyebrow="Crafted in the USA · Est. 2024"
        title="Where calm meets *luminous* skin."
        subtitle="Clean formulas, intentional rituals and radiant results. The J Effect is skincare designed to feel like coming home to yourself."
        btn1Label="Shop the Ritual"
        btn1Href="/shop"
        btn2Label="See the Guide"
        btn2Href="/ritual-guide"
        visual={<SiteImage slot="hero" priority sizes="(min-width: 1000px) 38vw, 80vw" />}
        floatLabel="Bestseller"
        floatTitle={HERO_PRODUCT?.name}
        floatSub={HERO_PRODUCT ? `${HERO_PRODUCT.type} · ${formatMoney(HERO_PRODUCT.price)}` : ''}
        floatHref={HERO_PRODUCT ? `/shop/${HERO_PRODUCT.slug}` : '/shop'}
        trust={[]}
      />
      <MarqueeBar />
      <CategoryCards />
      <FeaturedProducts count={4} />
      <RitualSplit />
      <Reviews />
      <AboutCta />
      <EmailSignup />
    </>
  );
}
