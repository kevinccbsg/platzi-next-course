

export default class extends React.Component {

  static async getInitialProps({ query }) {
    const idClip = query.id
    let req = await fetch(`https://api.audioboom.com/audio_clips/${idClip}.mp3`)
    let { body: { audio_clip } } = await req.json()
    return { audio_clip }
  }

  render () {
    const { audio_clip } = this.props
    return (
      <div>
        <header>Podcasts</header>
        <div className="podcast">
          <h1>{audio_clip.title}</h1>
          <img src={audio_clip.urls.image} alt={audio_clip.title} />
          <audio controls>
            <source src={audio_clip.urls.high_mp3} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <style jsx>{`
          header {
            color: #fff;
            background: #8756ca;
            padding: 15px;
            text-align: center;
          }
          .podcast {
            border: 1px solid #FAFAFA;
            border-radius: 3px;
            box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
            margin: 20px;
          }
          .podcast h1 {
            margin-left: 25px;
          }
          .podcast img,
          .podcast audio {
            width: 100%;
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