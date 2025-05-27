import Link from "next/link"
import { Mail, Facebook, Instagram, Youtube, Clock } from "lucide-react"
import businessInfo from "@/lib/business-info"

const TopBar = () => {
  return (
    <div className="bg-secondary py-1 text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="flex items-center text-xs">
          <span className="hidden md:inline-flex items-center">
            <Mail className="mr-1 h-3 w-3" />
            <a href={`mailto:${businessInfo.email}`} className="hover:text-primary mr-3" aria-label="Email">
              {businessInfo.email}
            </a>
            <Clock className="mr-1 h-3 w-3" />
            <span>Mon-Fri: 9:00-17:00</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Link href={businessInfo.socialMedia.facebook} aria-label="Facebook" className="hover:text-primary p-2">
            <Facebook className="h-6 w-6" />
          </Link>
          <Link href={businessInfo.socialMedia.instagram} aria-label="Instagram" className="hover:text-primary p-2">
            <Instagram className="h-6 w-6" />
          </Link>
          <Link href="https://www.youtube.com/@theferroliman2067" aria-label="YouTube" className="hover:text-primary p-2">
            <Youtube className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopBar
