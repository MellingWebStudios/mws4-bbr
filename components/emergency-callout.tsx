import Link from "next/link";
import { Phone } from "lucide-react";

const ServiceCallout = () => {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 py-10 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-6 text-center md:flex-row md:space-y-0 md:text-left">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              24/7 Emergency Boiler Service
            </h2>
            <p className="mt-2 text-lg font-medium text-red-100">
              Same-day repairs available when booked before 12pm
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
            <div className="relative">
              <div className="emergency-pulse-ring absolute -inset-1 rounded-full bg-white opacity-30 animate-ping"></div>
              <div className="emergency-pulse relative flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <a
                  href="tel:08003202345"
                  aria-label="Call our emergency service line at 0800 320 2345"
                  className="emergency-pulse relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <Phone className="h-8 w-8 text-red-600" />
                </a>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm font-medium uppercase tracking-wider text-red-100">
                Emergency Hotline
              </p>
              <a
                href="tel:08003202345"
                className="group mt-1 block text-2xl font-bold transition-colors hover:text-red-100 md:text-3xl"
                aria-label="Call our emergency service line at 0800 320 2345"
              >
                0800 320 2345
                <span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCallout;
