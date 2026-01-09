import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    // Redirect to dashboard login (dashboard owns auth)
    window.location.href = "/dashboard.html#/";
  }, []);

  return null;
}
<button
  onClick={() => (window.location.href = "/")}
  className="
    absolute top-6 left-6
    flex items-center gap-2
    text-muted-foreground
    hover:text-foreground
    transition-colors
    group
  "
>
  <span
    className="
      flex items-center justify-center
      w-9 h-9
      rounded-full
      border border-border
      bg-background/60
      backdrop-blur
      group-hover:border-primary/40
      group-hover:bg-background/80
      transition-all
    "
  >
    ←
  </span>
  <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
    Back
  </span>
</button>
