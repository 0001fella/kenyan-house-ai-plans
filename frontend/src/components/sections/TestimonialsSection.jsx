
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "David Kiprotich",
      role: "Construction Manager",
      company: "Nairobi Builders Ltd",
      quote: "JM Structural Solutions transformed our project delivery time by 60%. The AI-powered designs are incredibly accurate.",
      rating: 5
    },
    {
      name: "Sarah Wanjiku",
      role: "Architect",
      company: "Modern Designs Kenya",
      quote: "The 3D visualization and BIM integration saved us countless hours. Best investment we've made for our firm.",
      rating: 5
    },
    {
      name: "John Mwangi",
      role: "Homeowner",
      company: "Private Client",
      quote: "Built my dream home with accurate cost predictions. No surprises, just quality results.",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-r from-primary to-accent text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl opacity-90">
            Trusted by construction professionals across Kenya
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:scale-105 border border-white/20">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
              <div>
                <div className="font-semibold text-lg">{testimonial.name}</div>
                <div className="text-sm opacity-80">{testimonial.role}</div>
                <div className="text-sm opacity-60">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
