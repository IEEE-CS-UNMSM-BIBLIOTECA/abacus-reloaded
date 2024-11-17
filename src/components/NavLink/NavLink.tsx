const NavLink = ({ href, active, children }: {
  href: string,
  active: boolean
  children: React.ReactNode
}) => {
  if (active) {
    return (
      <span style={{ textDecoration: 'underline' }}>
        {children}
      </span>
    );
  }

  return (
    <a href={href}>
      {children}
    </a>
  );
};

export default NavLink;
