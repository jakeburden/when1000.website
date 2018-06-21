var html = require('choo/html')

var TITLE = 'when1000.website - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  return html`
    <main class="code lh-copy">
      <div class="pa3 cf center">
        <section class="fl mw6 w-50-m w-third-l pa3">
          <h1>When will ETH reach $1000 again?</h1>
          <p>
            By parsing this <a href=${'https://www.reddit.com/r/ethtrader/comments/8sn7ir/predict_the_exact_day_eth_will_reach_1000_again'}>Reddit thread</a> for dates in the future, we can utilize the "wisdom of crowds" to guess when eth will be $1000 again.
          </p>
          <h2>
            <strong>
            ${state.date || 'Fetching data and finding the average date...'}
            </strong>
          </h2>

          <small><a href=${'https://github.com/jekrb/when1000.website'}>github</a></small>
        </section>
      </div>
    </main>
  `
}
