import { Menu } from './menu'

interface LayoutProps{
  titulo?: String;
  children?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  return(
    <div className="app">
      <section className="main-content columns is-fullheight">
        <Menu />
        <div className="container column is-10">
          <div className="secsion">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">
                  {props.titulo}
                </p>
              </div>
              <div className="card-content">
                <div className="content">
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}