const express = require('express');

const DiscoveryV1 = require('ibm-watson/discovery/v1');
const {IamAuthenticator} = require('ibm-watson/auth');
const config = require('config');

// eslint-disable-next-line new-cap
const router = express.Router();

// 接続情報
const discovery = new DiscoveryV1({
  version: config.get('watson.discovery.version'),
  authenticator: new IamAuthenticator({
    apikey: config.get('watson.discovery.apikey'),
  }),
  serviceUrl: config.get('watson.discovery.serviceUrl'),
});

const createQuery = (searchStr) => {
  return `extracted_metadata.title:"${searchStr}"`;
};

const runQuery = async (searchStr) => {
  const query = createQuery(searchStr);

  const queryParams = {
    environmentId: config.get('watson.discovery.environmentId'),
    collectionId: config.get('watson.discovery.collectionId'),
    query,
  };

  console.log(`Running query - ${query}`);
  const queryResponse = await discovery.query(queryParams);
  console.log(queryResponse);
  const results = queryResponse.result.results;
  console.log(JSON.stringify(results, null, '\t'));
  if (queryResponse.result.results && queryResponse.result.results.length > 0) {
    return queryResponse.result.results.map((result, index) => {
      return {id: index + 1, name: result.extracted_metadata.title};
    });
  } else {
    return [];
  }
};


router.post('/search', async (req, res) => {
  try {
    if (!req.body.searchText) {
      res.status(400).send('Missing search text.');
      return;
    }

    // TODO: フレーバーの単語で、タイトルを検索する
    const responseText = await runQuery(req.body.searchText);
    res.json({
      total: responseText.length,
      items: responseText,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to call watson service');
  }
});

module.exports = router;
