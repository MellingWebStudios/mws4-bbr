// Refactored: Import business info from config and re-export for compatibility
import businessInfoConfig from "@/config/businessInfo";

// Destructure for easier access if needed
const {
  name,
  address,
  phone,
  email,
  gasSafeNumber,
  website,
  logo,
  socialMedia,
  openingHours,
  areasCovered,
} = businessInfoConfig;

export const businessInfo = businessInfoConfig;

export {
  name,
  address,
  phone,
  email,
  gasSafeNumber,
  website,
  logo,
  socialMedia,
  openingHours,
  areasCovered,
};

export default businessInfoConfig;