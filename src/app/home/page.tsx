import { homeClPre } from '@/const/style'

export function Home() {
  return (
    <div className={`${homeClPre}-wraper`}>
      <div className={`${homeClPre}-main`}>
        <h3>Tomos Zhao</h3>
        <p>Hey, I am Tomos Zhao.</p>
        <p>Enjoying books,animes and traveling.</p>
        <p>
          Maintaining curiosity,taking actions,and gaining inspiring results are
          where my passions lies
        </p>
        <p>
          The website serve as a personal hub, with the project code named
          Atori, inspired by the anime “ATRI-My Dear Moments”. Here, I will
          record articels about tech and hobby pratices, reviews of favorite
          animes and books, as well as some random musings from life. These are
          my “Dear Moments”, and of course I also look forward to incorporating
          useful AiI tools to make Atori as smart and emotional as in the anime
        </p>
      </div>
    </div>
  )
}
