import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="bg-gradient-to-br from-purple-50 to-white min-h-screen flex flex-col">
      {/* Navbar */}
      <header className="backdrop-blur-md bg-white/60 shadow-md fixed top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-purple-600">LinkNest</h1>
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 rounded-md text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition font-medium shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-4 pt-32 pb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg">
          Your Digital Hub, All in One Link
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          Build a stunning, shareable profile to showcase all your links — fast, modern, and beautiful.
        </p>
        <Link
          to="/register"
          className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Create Your LinkNest
        </Link>
      </section>

      {/* Features */}
      <section className="py-20 bg-white/50 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Choose LinkNest?
        </h2>
        <div className="grid gap-8 px-6 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              title: "Fully Customizable",
              desc: "Pick colors, fonts, and styles that match your brand.",
            },
            {
              title: "Real-time Analytics",
              desc: "Track link clicks and engagement effortlessly.",
            },
            {
              title: "Mobile Friendly",
              desc: "Looks amazing on every screen size.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white/70 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <h3 className="text-xl font-semibold mb-2 text-purple-600">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-purple-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold">Ready to Build Your LinkNest?</h2>
        <p className="mt-4">Start today — it’s free and takes less than a minute!</p>
        <Link
          to="/register"
          className="mt-6 inline-block px-8 py-3 bg-white text-purple-600 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Get Started
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="font-bold text-lg">LinkNest</p>
          <p className="mt-2 text-gray-400">© 2025 All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
