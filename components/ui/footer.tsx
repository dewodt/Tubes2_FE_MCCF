const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="font-inter flex items-center justify-center border-t-2 border-t-border bg-background px-8 py-7 text-base lg:px-16 xl:text-lg">
      {/* Copyright */}
      <p className="text-center font-medium text-muted-foreground">
        Copyright © {year} WikiRace
      </p>
    </footer>
  );
};

export default Footer;
