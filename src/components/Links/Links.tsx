export interface Link {
  href: string;
  label: string;
}

interface LinksProps extends React.HTMLProps<HTMLSpanElement> {
  links: Link[];
}

const Links = ({ links, ...rest }: LinksProps) => {
  return (
    <span {...rest}>
      {
        links.map(({ href, label }, i) => (
          <span key={href}>
            <a href={href}>
              {label}
            </a>
            {i !== (links.length - 1) && ', '}
          </span>
        ))
      }
    </span>
  );
};

export default Links;
