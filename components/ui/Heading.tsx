type HeadingProps = {
  title: string;
  description: string;
};
const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div>
      <h2  className="text-xl  md:text-3xl font-bold tracking-tight pb-2 ">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
