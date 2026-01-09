interface SidebarHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function SidebarHeaderContent({
  title,
  description,
  children,
}: SidebarHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {title}
        </h1>
        <p className="text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {children}
      </div>
    </div>
  );
}
