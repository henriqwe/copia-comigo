import './welcome.module.css';

/* eslint-disable-next-line */
export interface ComponentsProps {}

export function Welcome(props: ComponentsProps) {
  return (
    <div>
      <h1 className={"text-sky-300"}>Seja Bem Vindo(a)!</h1>
    </div>
  );
}

export default Welcome;
