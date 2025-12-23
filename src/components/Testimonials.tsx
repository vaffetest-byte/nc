import { memo, useEffect, useState } from "react";
import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import testimonialJames from "@/assets/testimonial-james.jpg";
import testimonialMaria from "@/assets/testimonial-maria.jpg";
import testimonialRobert from "@/assets/testimonial-robert.jpg";
import testimonialLisa from "@/assets/testimonial-lisa.jpg";

const Testimonials = memo(() => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: "James T.",
      image: testimonialJames,
      rating: 5,
      text: "National Claims Association has been instrumental in helping my clients. Their fast funding allows my clients to focus on recovery while I focus on winning their case.",
    },
    {
      name: "Maria C.",
      image: testimonialMaria,
      rating: 5,
      text: "The team at National Claims Association understands the legal process. They work efficiently and their non-compounded rates are the best in the industry.",
    },
    {
      name: "Robert H.",
      image: testimonialRobert,
      rating: 5,
      text: "I've worked with many funding companies, but National Claims Association stands out for their professionalism and client-first approach.",
    },
    {
      name: "Lisa P.",
      image: testimonialLisa,
      rating: 5,
      text: "Quick approvals, reasonable terms, and excellent communication. I recommend National Claims Association to all my colleagues.",
    },
  ];

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <section className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground italic">
            What Our Customers Are Saying...
          </h2>
        </div>

        <div className="max-w-6xl mx-auto relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={testimonial.name} className="pl-4 md:basis-1/2 lg:basis-1/4">
                  <div className="flex flex-col items-center text-center p-4 animate-fade-in">
                    {/* Avatar */}
                    <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-border shadow-lg">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Quote */}
                    <p className="text-foreground/80 mb-6 leading-relaxed text-sm min-h-[100px]">
                      "{testimonial.text}"
                    </p>

                    {/* Name */}
                    <p className="font-heading font-bold text-foreground text-lg mb-2">
                      {testimonial.name}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = "Testimonials";

export default Testimonials;