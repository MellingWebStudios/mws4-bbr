import Image from "next/image"

export default function EngineersTeam({ className = "", width = 280, height = 280 }) {
  return (
    <div className={`relative ${className}`}>
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20engineers-u9b5dTX1v46GUhyjbRLIwdnF5aKH0I.png"
        alt="Birmingham Boiler Repairs team of engineers"
        width={width}
        height={height}
        className="drop-shadow-lg"
        priority
        loading="eager"
        quality={90}
      />
    </div>
  )
}
