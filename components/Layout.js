import Link from 'next/link';

export default class Layout extends React.Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <header>
          <Link href="/">
            <a className="home-link">
              {this.props.title}
            </a>
          </Link>
        </header>
        {children}
        <style jsx>{`
          header {
            color: #fff;
            background: #8756ca;
            padding: 15px;
            text-align: center;
          }
          .home-link {
            color: white;
            text-decoration: none;
          }
          h2 {
            padding: 5px;
            font-size: 0.9em;
            font-weight: 600;
            margin: 0;
            text-align: center;
          }
        `}</style>

        <style jsx global>{`
          body {
            margin: 0;
            font-family: system-ui;
            background: white;
          }
        `}</style>
      </div>
    )
  }
}