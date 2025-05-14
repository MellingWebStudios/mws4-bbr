import Link from "next/link"
import { Mail, Facebook, Instagram, Youtube, Clock } from "lucide-react"

const TopBar = () => {
  return (
    <div className="bg-secondary py-1 text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="flex items-center text-xs">
          <span className="hidden md:inline-flex items-center">
            <Mail className="mr-1 h-3 w-3" />
            <Link href="mailto:boilers.birmingham@yahoo.com" className="hover:text-primary mr-3">
              boilers.birmingham@yahoo.com
            </Link>
            <Clock className="mr-1 h-3 w-3" />
            <span>Mon-Fri: 9:00-17:00</span>
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-primary p-2">
            <Facebook className="h-6 w-6" />
          </Link>
          <Link href="https://instagram.com" aria-label="Instagram" className="hover:text-primary p-2">
            <Instagram className="h-6 w-6" />
          </Link>
          <Link href="https://youtube.com" aria-label="YouTube" className="hover:text-primary p-2">
            <Youtube className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopBar
