type props = {
  title: String;
  description?: String;
};
export const Heading = ({ title, description }: props) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
