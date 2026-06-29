import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

import { motion } from 'framer-motion'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { testimonials } from '@/data/content'

import SectionHeader from '@/components/ui/SectionHeader'

import TestimonialCard from '@/components/ui/TestimonialCard'

import FadeInWhenVisible from '@/components/motion/FadeInWhenVisible'

import { EASE } from '@/lib/motion'

import { cn } from '@/lib/utils'



const AUTOPLAY_MS = 5000

const GAP = 24



type SlideDirection = 'prev' | 'next'



export default function TestimonialsSection() {

  const items = testimonials.items

  const count = items.length

  const extendedItems = [...items, ...items, ...items]



  const [trackIndex, setTrackIndex] = useState(count)

  const [paused, setPaused] = useState(false)

  const [trackX, setTrackX] = useState(0)

  const [instant, setInstant] = useState(false)

  const [isAnimating, setIsAnimating] = useState(false)



  const containerRef = useRef<HTMLDivElement>(null)

  const trackRef = useRef<HTMLDivElement>(null)

  const isAnimatingRef = useRef(false)



  const realActive = trackIndex % count



  const getCenteredX = useCallback((index: number) => {

    const container = containerRef.current

    const track = trackRef.current

    if (!container || !track) return 0



    const card = track.querySelector<HTMLElement>('[data-testimonial-card]')

    if (!card) return 0



    const containerWidth = container.offsetWidth

    const cardWidth = card.offsetWidth

    const centerOffset = (containerWidth - cardWidth) / 2



    return centerOffset - index * (cardWidth + GAP)

  }, [])



  const syncTrack = useCallback(

    (index: number) => {

      setTrackX(getCenteredX(index))

    },

    [getCenteredX],

  )



  useLayoutEffect(() => {

    syncTrack(trackIndex)

  }, [trackIndex, syncTrack])



  useEffect(() => {

    const onResize = () => syncTrack(trackIndex)

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)

  }, [trackIndex, syncTrack])



  useEffect(() => {

    if (!instant) return

    const id = requestAnimationFrame(() => setInstant(false))

    return () => cancelAnimationFrame(id)

  }, [instant])



  const beginSlide = useCallback((getNext: (current: number) => number) => {

    if (isAnimatingRef.current) return

    isAnimatingRef.current = true

    setIsAnimating(true)

    setInstant(false)

    setTrackIndex(getNext)

  }, [])



  const paginate = useCallback(

    (direction: SlideDirection) => {

      beginSlide((current) =>

        direction === 'next' ? current + 1 : current - 1,

      )

    },

    [beginSlide],

  )



  const handleAnimationComplete = useCallback(() => {

    if (!isAnimatingRef.current) return



    setTrackIndex((current) => {

      if (current >= 2 * count) {

        setInstant(true)

        return current - count

      }

      if (current < count) {

        setInstant(true)

        return current + count

      }

      return current

    })



    isAnimatingRef.current = false

    setIsAnimating(false)

  }, [count])



  const goTo = useCallback(

    (index: number) => {

      const target = ((index % count) + count) % count

      if (target === realActive || isAnimatingRef.current) return



      const forward = (target - realActive + count) % count

      const backward = (realActive - target + count) % count



      if (forward === 1) paginate('next')

      else if (backward === 1) paginate('prev')

      else {

        setInstant(true)

        setTrackIndex(count + target)

      }

    },

    [realActive, count, paginate],

  )



  useEffect(() => {

    if (paused) return



    const id = window.setInterval(() => {

      beginSlide((current) => current + 1)

    }, AUTOPLAY_MS)



    return () => window.clearInterval(id)

  }, [paused, beginSlide])



  return (

    <section className="section-pad bg-white">

      <div className="container-px mx-auto max-w-7xl">

        <FadeInWhenVisible className="mb-10 md:mb-14">

          <SectionHeader

            eyebrow={testimonials.eyebrow}

            title={testimonials.title}

            subtitle={testimonials.subtitle}

          />

        </FadeInWhenVisible>



        <FadeInWhenVisible delay={0.1}>

          <div

            className="relative mx-auto max-w-5xl"

            onMouseEnter={() => setPaused(true)}

            onMouseLeave={() => setPaused(false)}

          >

            <button

              type="button"

              onClick={() => paginate('prev')}

              disabled={isAnimating}

              aria-label="Testemunho anterior"

              className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-white/90 p-2 text-coffee shadow-soft transition-all hover:border-caramel/30 hover:text-caramel disabled:pointer-events-none disabled:opacity-40 md:flex"

            >

              <ChevronLeft className="h-4 w-4" />

            </button>



            <button

              type="button"

              onClick={() => paginate('next')}

              disabled={isAnimating}

              aria-label="Testemunho seguinte"

              className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 rounded-full border border-border bg-white/90 p-2 text-coffee shadow-soft transition-all hover:border-caramel/30 hover:text-caramel disabled:pointer-events-none disabled:opacity-40 md:flex"

            >

              <ChevronRight className="h-4 w-4" />

            </button>



            <div

              ref={containerRef}

              className="relative h-[320px] overflow-hidden px-0 md:h-[340px] md:px-6 lg:px-10"

            >

              <motion.div

                ref={trackRef}

                className="absolute inset-y-0 left-0 flex items-stretch"

                style={{ gap: GAP }}

                animate={{ x: trackX }}

                transition={{ duration: instant ? 0 : 0.65, ease: EASE }}

                onAnimationComplete={handleAnimationComplete}

              >

                {extendedItems.map((item, index) => {

                  const isActive = index === trackIndex



                  return (

                    <div

                      key={`testimonial-${index}`}

                      data-testimonial-card

                      className={cn(

                        'h-full w-full shrink-0 transition-[opacity,transform] duration-500 ease-premium md:w-[520px]',

                        isActive

                          ? 'scale-100 opacity-100'

                          : 'max-md:pointer-events-none max-md:opacity-0 md:scale-[0.92] md:opacity-45',

                      )}

                    >

                      <TestimonialCard

                        testimonial={item}

                        isActive={isActive}

                      />

                    </div>

                  )

                })}

              </motion.div>

            </div>



            <div className="mt-10 flex items-center justify-center gap-2">

              {items.map((item, index) => (

                <button

                  key={item.id}

                  type="button"

                  onClick={() => goTo(index)}

                  disabled={isAnimating}

                  aria-label={`Ir para o testemunho ${index + 1}`}

                  aria-current={index === realActive ? 'true' : undefined}

                  className={cn(

                    'h-1.5 rounded-full transition-all duration-500 disabled:pointer-events-none',

                    index === realActive

                      ? 'w-8 bg-caramel'

                      : 'w-1.5 bg-border hover:bg-coffee/40',

                  )}

                />

              ))}

            </div>

          </div>

        </FadeInWhenVisible>

      </div>

    </section>

  )

}

