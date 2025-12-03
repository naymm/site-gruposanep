import { useEffect, useState, useRef } from "react";
import { Building2, Users, Globe, TrendingUp } from "lucide-react";

interface StatProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
}

const StatCard = ({ icon, value, suffix = "", label }: StatProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className="text-center p-8 rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="w-16 h-16 mx-auto mb-4 rounded-xl gradient-corporate flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        {count}
        {suffix}
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: <Building2 size={28} />,
      value: 35,
      suffix: "+",
      label: "Anos de Experiência",
    },
    {
      icon: <Users size={28} />,
      value: 5000,
      suffix: "+",
      label: "Colaboradores",
    },
    {
      icon: <Globe size={28} />,
      value: 8,
      label: "Países de Atuação",
    },
    {
      icon: <TrendingUp size={28} />,
      value: 20,
      suffix: "+",
      label: "Empresas do Grupo",
    },
  ];

  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            Nossos Números
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mt-2">
            Impacto que Transforma
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;