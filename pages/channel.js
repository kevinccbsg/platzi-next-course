import 'isomorphic-fetch';
import Link from 'next/link'
import Layout from '../components/Layout';
import ChannelGrid from '../components/ChannelGrid';
import Error from './_error';

export default class extends React.Component {

  static async getInitialProps({ query, res }) {
    const idChannel = query.id
    try {
      const [reqChannel, reqSeries, reqAudios] = await Promise.all([
        fetch(`https://api.audioboom.com/channels/${idChannel}`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
        fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
      ])
      const status = reqChannel.status;
      if (status >= 400) {
        res.statusCode = status;
        return { statusCode: status, channel: null, audioClips: null, series: null }  
      }
      const dataChannel = await reqChannel.json()
      const channel = dataChannel.body.channel
  
      const dataAudios = await reqAudios.json()
      const audioClips = dataAudios.body.audio_clips
  
      const dataSeries = await reqSeries.json()
      const series = dataSeries.body.channels
  
      return { channel, audioClips, series, statusCode: 200 }
    } catch (e) {
      res.statusCode = 503;
      console.log(e);
      return { error: idChannel, statusCode: 503, channel: null, audioClips: null, series: null }
    }
  }

  render () {
    const { channel, audioClips, series, statusCode } = this.props
    if (statusCode !== 200) {
      return <Error statusCode={statusCode} />
    }
    return (
      <Layout title="Podcast">
        <h1>{channel.title}</h1>
        {(series.length > 0) && (
          <div>
            <h2>Series</h2>
            <ChannelGrid channels={series} />
          </div>
        )}
        <h2>Ultimos Podcasts</h2>
        {audioClips.map((clip) => (
          <Link href={`/podcast?id=${clip.id}`}>
            <div className="podcast" key={clip.id}>{clip.title}</div>
          </Link>
        ))}
        <style jsx>{`
          .podcast {
            display: block;
            text-decoration: none;
            color: #333;
            padding: 15px;
            border-bottom: 1px solid rgba(0,0,0,0.2);
            cursor: pointer;
          }
          .podcast:hover {
            color: #000;
          }
          .podcast h3 {
            margin: 0;
          }
          .podcast .meta {
            color: #666;
            margin-top: 0.5em;
            font-size: 0.8em;
          }
        `}</style>

        <style jsx global>{`
          body {
            margin: 0;
            font-family: system-ui;
            background: white;
          }
        `}</style>
      </Layout>
    )
  }
}