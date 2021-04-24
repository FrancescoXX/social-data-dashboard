import axios from 'axios'
import Tweettest from '../models/tweettest'

// ATTENTION: partial typing of the twitter api response
type TweetResponse = {
  id_str: string
  text: string
  created_at: Date
  retweet_count: number
  favorite_count: number
  user: {
    id_str: string
  }
}

export async function addTweets(username: string) {
  console.log('start adding tweets (' + Date.now() + ')')
  const { data } = await axios.get<TweetResponse[]>(
    'http://twitterclient:3003/api/tweets/statusesUserTimeline/' + username,
  )

  const tweets = data.map(tweet => ({
    id: tweet.id_str,
    created: tweet.created_at,
    favorite_count: tweet.favorite_count,
    retweet_count: tweet.retweet_count,
    text: tweet.text,
    userId: tweet.user.id_str,
  }))

  // docs: https://sequelize.org/master/class/lib/model.js~Model.html#static-method-bulkCreate
  // https://stackoverflow.com/a/59478259
  const bulkResponse = await Tweettest.bulkCreate(tweets, {
    updateOnDuplicate: ['retweet_count', 'favorite_count'],
  })
  console.log('done adding tweets (' + Date.now() + ')')
  return bulkResponse
}
