import { homeClPre } from '@/const/style'
import './index.css'

export const PersonProfile = () => {
  return (
    <div className={`${homeClPre}-wraper`}>
      <div className={`${homeClPre}-content`}>
        <h1 className="profile-title">Tomos Zhao</h1>

        <article className="px-sm profile-content">
          <div className="side-item">
            <p>Hey, I am Tomos Zhao.</p>
          </div>
          <div className="side-item">
            <p>Working as frontend developer.</p>
            <p>Enjoying books,animes and traveling.</p>
            <p>
              Maintaining curiosity,taking actions,and gaining inspiring results
              are where my passions lies.
            </p>
          </div>
          <div className="side-item">
            <p>
              This website serve as a personal hub, with the project code named
              Atori, inspired by the anime “
              <a href="https://atri-animation.com/" target="_blank">
                ATRI-My Dear Moments
              </a>
              ”. Here, I will record articels about tech and hobby pratices,
              reviews of favorite animes and books, as well as some random
              musings from life. These are my “Dear Moments”, and of course I
              also look forward to incorporating useful AI tools to make Atori
              as smart and emotional as in the anime.
            </p>
          </div>
          <div className="side-item">
            <p>
              If you are a blog fun, you also can subscribe my blog via
              <a
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2"
              >
                RSS.
              </a>
            </p>
          </div>
        </article>
      </div>
    </div>
  )
}
