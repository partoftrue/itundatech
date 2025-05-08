interface SectionDividerProps {
  title: string
  description?: string
  className?: string
}

export function SectionDivider({ title, description, className = "" }: SectionDividerProps) {
  return (
    <div className={`py-12 ${className}`}>
      <div className="toss-container">
        <div className="max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-medium mb-3">{title}</h2>
          {description && <p className="text-muted-foreground text-lg">{description}</p>}
        </div>
      </div>
    </div>
  )
}
