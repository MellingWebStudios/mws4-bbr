import Link from "next/link";
import { Phone } from "lucide-react";
import TrackedPhoneLink from "@/components/tracked-phone-link";

const ServiceCallout = () => {
  return (
    <section className="bg-gradient-to-r from-red-600 to-red-700 py-10 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between space-y-6 text-center md:flex-row md:space-y-0 md:text-left">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Expert Boiler Repairs, Servicing & Gas Inspections
            </h2>
            <p className="mt-2 text-lg font-medium text-red-100">
              Same-day appointments available when booked before 12pm
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-6 md:space-y-0">
            <div className="relative">
              <div className="emergency-pulse-ring absolute -inset-1 rounded-full bg-white opacity-30 animate-ping"></div>
              <div className="emergency-pulse relative flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <TrackedPhoneLink
                  phone="08003202345"
                  trackingLocation="emergency_callout"
                  trackingSource="emergency_phone_icon"
                  engagementType="emergency_call"
                  ariaLabel="Call our hotline at 0800 320 2345"
                  className="emergency-pulse relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  <Phone className="h-8 w-8 text-red-600" />
                </TrackedPhoneLink>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-sm font-medium uppercase tracking-wider text-red-100">
                Call our hotline now
              </p>
              <TrackedPhoneLink
                phone="08003202345"
                trackingLocation="emergency_callout"
                trackingSource="emergency_phone_number"
                engagementType="emergency_call"
                className="group mt-1 block text-2xl font-bold transition-colors hover:text-red-100 md:text-3xl"
                ariaLabel="Call our hotline at 0800 320 2345"
              >
                0800 320 2345
                <span className="block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full"></span>
              </TrackedPhoneLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCallout;
