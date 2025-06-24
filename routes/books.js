const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');

// Google Books API를 사용하여 책 검색
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search books' });
  }
});

// Amazon API를 사용하여 책 가격 검색
router.get('/amazon-price', async (req, res) => {
  try {
    const { isbn } = req.query;
    
    // Amazon API 키 설정
    const AMAZON_ACCESS_KEY = process.env.AMAZON_ACCESS_KEY;
    const AMAZON_SECRET_KEY = process.env.AMAZON_SECRET_KEY;
    const AMAZON_PARTNER_TAG = process.env.AMAZON_PARTNER_TAG;
    const AMAZON_HOST = 'webservices.amazon.com';
    const AMAZON_REGION = 'us-east-1';
    
    // Amazon API 요청 파라미터
    const params = {
      'Service': 'ProductAdvertisingAPI',
      'Operation': 'SearchItems',
      'PartnerTag': AMAZON_PARTNER_TAG,
      'PartnerType': 'Associates',
      'Marketplace': 'www.amazon.com',
      'Keywords': isbn,
      'Resources': [
        'ItemInfo.Title',
        'ItemInfo.ByLineInfo',
        'ItemInfo.ExternalIds',
        'Offers.Listings.Price'
      ]
    };
    
    // Amazon API 요청 헤더 생성
    const date = new Date().toISOString().replace(/[:-]|\.\d{3}/g, '');
    const canonicalUri = '/paapi5/searchitems';
    const canonicalQueryString = '';
    const canonicalHeaders = `content-encoding:amz-1.0\ncontent-type:application/json; charset=utf-8\nhost:${AMAZON_HOST}\nx-amz-date:${date}\nx-amz-target:com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems\n`;
    const signedHeaders = 'content-encoding;content-type;host;x-amz-date;x-amz-target';
    
    // 요청 본문 생성
    const payload = JSON.stringify(params);
    const canonicalRequest = [
      'POST',
      canonicalUri,
      canonicalQueryString,
      canonicalHeaders,
      signedHeaders,
      require('crypto').createHash('sha256').update(payload).digest('hex')
    ].join('\n');
    
    // 서명 생성
    const algorithm = 'AWS4-HMAC-SHA256';
    const credentialScope = `${date.substring(0, 8)}/${AMAZON_REGION}/ProductAdvertisingAPI/aws4_request`;
    const stringToSign = [
      algorithm,
      date,
      credentialScope,
      require('crypto').createHash('sha256').update(canonicalRequest).digest('hex')
    ].join('\n');
    
    // 서명 키 생성
    const kDate = require('crypto').createHmac('sha256', `AWS4${AMAZON_SECRET_KEY}`).update(date.substring(0, 8)).digest();
    const kRegion = require('crypto').createHmac('sha256', kDate).update(AMAZON_REGION).digest();
    const kService = require('crypto').createHmac('sha256', kRegion).update('ProductAdvertisingAPI').digest();
    const kSigning = require('crypto').createHmac('sha256', kService).update('aws4_request').digest();
    
    // 서명 계산
    const signature = require('crypto').createHmac('sha256', kSigning).update(stringToSign).digest('hex');
    
    // 인증 헤더 생성
    const authorization = `${algorithm} Credential=${AMAZON_ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
    
    // Amazon API 요청
    const amazonResponse = await axios.post(
      `https://${AMAZON_HOST}${canonicalUri}`,
      payload,
      {
        headers: {
          'Content-Encoding': 'amz-1.0',
          'Content-Type': 'application/json; charset=utf-8',
          'Host': AMAZON_HOST,
          'X-Amz-Date': date,
          'X-Amz-Target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems',
          'Authorization': authorization
        }
      }
    );
    
    res.json(amazonResponse.data);
  } catch (error) {
    console.error('Amazon API Error:', error);
    res.status(500).json({ error: 'Failed to fetch Amazon price' });
  }
});

module.exports = router; 