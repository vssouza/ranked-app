export function Footer() {
  return (
    <footer className="border-t py-6">
      <div className="mx-auto max-w-6xl px-4 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} GameCrafters.gg</span>

        <span>
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
