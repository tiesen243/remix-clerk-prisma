export const Footer: React.FC = () => (
  <footer className="border-t bg-background py-2">
    <div className="container flex items-center justify-between gap-4 text-muted-foreground">
      <p>
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </p>
      <p>
        {new Date().getFullYear()} ©{' '}
        <a href="https://tiesen.id.vn" target="_blank" rel="noopener noreferrer">
          tiesen243
        </a>
      </p>
    </div>
  </footer>
)
