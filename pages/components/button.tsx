interface ButtonProps {
  text: string;
  [key: string]: any;
}

export default function Button({ text, ...rest }: ButtonProps) {
  return <button {...rest}>{text}</button>;
}
