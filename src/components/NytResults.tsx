import React from 'react';

type Props = {
    //changePage: (e: any, direction: string) => void,
    results: Array<string>;
}

const NytResults: React.FunctionComponent<Props> = ({results}) => {
    return (
        <div>
            {/* <div>
              <button onClick={(e) => changePage(e, 'down')}>Previous 10</button>
              <button onClick={(e) => changePage(e, 'up')}>Next 10</button>
            </div> */}
          { results.map((result: any, id: number) => {
            return (
              <div key={id}>
              <h2>{result.headline.main}</h2>
              {result.multimedia.length > 1 ? <img alt="article" src={`http://www.nytimes.com/${result.multimedia[1].url}`} /> : ''}
              <p>
                {result.snippet}
                <br />
                {result.keywords.length > 0 ? ' Keywords: ' : ''}
              </p>
              <ul>
                {result.keywords.map((keyword: any) => <li key={keyword.value}>{keyword.value}</li>)}
              </ul>
              <a href={result.web_url}><button>Read It</button></a>
            </div>
            )
          })}
        </div>
    )
}

export default NytResults
