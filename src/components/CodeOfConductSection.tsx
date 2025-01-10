import { Shield, Users, Heart, Scale } from "lucide-react";

export const CodeOfConductSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-white via-purple-50/50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
            Our Code of Conduct
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to providing a welcoming and supportive environment for all members of our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-glow transition-shadow duration-300">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Safety First</h3>
            <p className="text-gray-600">
              We maintain a harassment-free environment for everyone, regardless of background or identity.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-glow transition-shadow duration-300">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Inclusive Community</h3>
            <p className="text-gray-600">
              We welcome developers of all skill levels and backgrounds, fostering an inclusive learning environment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-glow transition-shadow duration-300">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Respectful Interaction</h3>
            <p className="text-gray-600">
              We encourage constructive feedback and respectful communication between mentors and learners.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-glow transition-shadow duration-300">
            <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Professional Standards</h3>
            <p className="text-gray-600">
              We uphold high professional standards in all interactions and educational content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};