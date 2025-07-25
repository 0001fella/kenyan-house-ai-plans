
import React from 'react';
import { Award, Users, Globe, Star } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    { number: "500+", label: "Projects Completed", icon: <Award className="h-6 w-6" /> },
    { number: "50+", label: "Active Contractors", icon: <Users className="h-6 w-6" /> },
    { number: "15", label: "Counties Served", icon: <Globe className="h-6 w-6" /> },
    { number: "98%", label: "Client Satisfaction", icon: <Star className="h-6 w-6" /> }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-card via-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:scale-105 border border-border">
                <div className="flex justify-center mb-4 text-primary group-hover:text-accent transition-colors">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
