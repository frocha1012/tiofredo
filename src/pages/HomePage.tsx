import HeroSection from '@/components/home/Hero'
import AboutSection from '@/components/home/About'
import SpecialtiesSection from '@/components/home/Specialties'
import WhyChooseUsSection from '@/components/home/WhyChooseUs'
import ReservationCTA from '@/components/home/ReservationCTA'
import ContactSection from '@/components/home/Contact'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <SpecialtiesSection />
      <WhyChooseUsSection />
      <ReservationCTA />
      <ContactSection />
    </main>
  )
}
