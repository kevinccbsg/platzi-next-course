import 'isomorphic-fetch';
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';

// prefetch no carga getInitialProps!!! y solo funciona en modo start o producción

export default class extends React.Component {

  static async getInitialProps(params) {
    let req = await fetch('https://api.audioboom.com/channels/recommended')
    let { body: channels } = await req.json()
    return { channels }
  }

  render() {
    const { channels } = this.props;
    return (
      <Layout title="Podcast">
        <ChannelGrid channels={channels} />
      </Layout>
    )
  }
}
