export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="mx-auto max-w-6xl px-4 flex flex-row flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} GameCrafters.gg</span>

        <span className="whitespace-nowrap">
          Powered by{" "}
          <a
            href="https://www.npmjs.com/package/rankings-core"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4 hover:text-foreground"
          >
            rankings-core
          </a>
        </span>
      </div>
    </footer>
  );
}
