import Hero from '@/components/Hero';
import MarqueeBar from '@/components/MarqueeBar';
import ProofBar from '@/components/ProofBar';
import CategoryCards from '@/components/CategoryCards';
import FeaturedProducts from '@/components/FeaturedProducts';
import RitualSplit from '@/components/RitualSplit';
import ImageMosaic from '@/components/ImageMosaic';
import Reviews from '@/components/Reviews';
import BrandPromise from '@/components/BrandPromise';
import AboutCta from '@/components/AboutCta';
import EmailSignup from '@/components/EmailSignup';

export const metadata = {
  title: 'The J Effect | Mindful Skincare Rituals — Made in the USA',
  description: 'Discover The J Effect: clean skincare rituals crafted in the USA. Shop moisturizers, serums, cleansers and ritual bars for luminous, confident skin.',
};

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Crafted in the USA · Est. 2024"
        title="Where calm meets luminous skin."
        subtitle="Clean formulas, intentional rituals, and radiant results — The J Effect is skincare designed to feel like coming home to yourself."
        btn1Label="Shop the Ritual"
        btn1Href="/shop"
        btn2Label="See the Guide"
        btn2Href="/ritual-guide"
        image="https://images.unsplash.com/photo-1619451334792-150fd785ee74?w=1800&q=80"
        showFloatCard={true}
        floatLabel="Bestseller"
        floatTitle="Watermelon Hydration"
        floatSub="Moisturizer — $28.00"
      />
      <MarqueeBar />
      <ProofBar />
      <CategoryCards />
      <FeaturedProducts count={4} />
      <RitualSplit />
      <ImageMosaic />
      <Reviews />
      <BrandPromise />
      <AboutCta />
      <EmailSignup />
    </>
  );
}
