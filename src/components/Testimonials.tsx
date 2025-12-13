import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Michael R.",
      location: "New York, NY",
      rating: 5,
      text: "National Claims Assoc was a lifesaver during my car accident case. They approved my funding in less than 24 hours and the process was completely stress-free.",
      verified: true,
    },
    {
      name: "Sarah T.",
      location: "Los Angeles, CA",
      rating: 5,
      text: "Professional, fast, and caring. They understood my situation and provided the financial support I needed while waiting for my settlement.",
      verified: true,
    },
    {
      name: "James L.",
      location: "Chicago, IL",
      rating: 5,
      text: "I was skeptical at first, but their team explained everything clearly. No hidden fees, no credit check, and I only repaid when I won my case.",
      verified: true,
    },
  ];

  const stats = {
    rating: "4.9",
    reviews: "2,500+",
  };

  return (
    <section className="py-24 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            Client Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-3 mb-4">
            What Our Clients Say
          </h2>
          
          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-2xl font-bold text-foreground">{stats.rating}</span>
            <span className="text-muted-foreground">from {stats.reviews} reviews</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-7 card-shadow relative animate-fade-in border border-border group hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary/10 group-hover:text-primary/20 transition-colors" />

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground/80 mb-6 leading-relaxed text-sm">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-secondary-foreground font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                </div>
                {testimonial.verified && (
                  <span className="ml-auto text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-medium border border-emerald-200">
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;