import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ModeToggle } from "@/components/ui-custom/mode-toggle";
import {
  ArrowRight,
  Rocket,
  KanbanSquare,
  Users,
} from "lucide-react";
import heroParalax from "../assets/paralax-hero.jpg";

// Animation presets
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const stagger = {
  show: { transition: { staggerChildren: 0.15 } },
};

export default function LandingPageParallax() {
  return (
    <div className="min-h-screen text-foreground">

      {/* NAV */}
      <header className="w-full border-b border-border fixed top-0 left-0 bg-background/40 backdrop-blur-xl z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <Link to="/">
            <p className="text-2xl font-bold text-violet-500 dark:text-violet-400">
              ProjectHub
            </p>
          </Link>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link to="/login"><Button variant="secondary" className="cursor-pointer">Login</Button></Link>
            <Link to="/register"><Button className="cursor-pointer">Get Started</Button></Link>
          </div>
        </div>
      </header>

      {/* PARALLAX HERO */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 animate-slow-zoom"
          style={{ backgroundImage: `url(${heroParalax})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background"></div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative z-10 text-center max-w-3xl px-6"
        >
          <h1 className="text-6xl font-extrabold leading-tight drop-shadow-xl">
            Organize Projects with
            <span className="block text-violet-600 dark:text-violet-400">
              Speed & Precision
            </span>
          </h1>

          <p className="text-lg text-muted-foreground mt-6">
            A minimalist yet powerful dashboard to track, manage, and complete your projects.
          </p>

          <div className="flex gap-4 justify-center mt-10">
            <Link to="/dashboard">
              <Button size="lg" className="px-6 glass-card cursor-pointer">
                Visit Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="glass-card cursor-pointer">
                Create Account
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl font-bold text-center mb-14"
          >
            What Makes ProjectHub Different?
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {[
              {
                icon: KanbanSquare,
                title: "Beautiful Project Overview",
                text: "Smart organization tools help you visualize and manage projects instantly.",
              },
              {
                icon: Users,
                title: "Designed for Teams",
                text: "Share, collaborate, and track productivity together.",
              },
              {
                icon: Rocket,
                title: "Speed Optimized",
                text: "Lightning-fast UI built with React, shadcn, and modern APIs.",
              },
            ].map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass-card p-8 rounded-2xl backdrop-blur-xl border border-white/10 shadow-xl"
              >
                <f.icon className="w-14 h-14 text-violet-500 mb-4" />
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="text-muted-foreground mt-2">{f.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl font-bold text-center mb-14"
          >
            What Our Users Say
          </motion.h2>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                name: "Jane Doe",
                role: "Project Manager",
                text: "ProjectHub completely changed the way our team organizes projects. The dashboard is fast, intuitive, and beautiful.",
              },
              {
                name: "John Smith",
                role: "Developer",
                text: "I love the clean UI and performance. Tasks and progress tracking are so much easier now.",
              },
              {
                name: "Maria Lee",
                role: "Designer",
                text: "Sharing projects and collaborating is effortless. ProjectHub keeps our workflow smooth.",
              },
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="glass-card p-6 rounded-2xl backdrop-blur-xl border border-white/10 shadow-lg"
              >
                <p className="text-muted-foreground mb-4">"{t.text}"</p>
                <h4 className="text-lg font-semibold">{t.name}</h4>
                <span className="text-sm text-muted-foreground">{t.role}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 bg-violet-600 text-white relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-4xl font-extrabold mb-6"
          >
            Ready to Organize Your Projects?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-lg mb-8"
          >
            Join thousands of teams and individuals who are speeding up their workflow.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="flex justify-center gap-4"
          >
            <Link to="/register">
              <Button size="lg" className="px-8 cursor-pointer">
                Get Started
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="secondary" className="px-8 cursor-pointer">
                View Dashboard
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative blurred shapes */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-violet-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-violet-500 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-muted-foreground border-t border-border">
        © {new Date().getFullYear()} ProjectHub — All rights reserved.
      </footer>
    </div>
  );
}
