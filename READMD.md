# Notion API proxy

NotionAPI 转发代理服务

NotionAPI 直接在浏览器上发起请求会受到Notion的CORS限制，Notion也暂时没有取消该限制的计划。所以用一个转发代理服务来处理直接中浏览器发起的请求。

## Usage

### 直接发起http请求

```javascript
const apiUrl = "http://{{YOUR_DOMAIN}}/notion-api/https://api.notion.com/v1/search"
const requestOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer {{NOTION_API_TOKE}}",
        "Notion-Version": "2022-06-28"
    },
    body: JSON.stringify({
        "query": "",
        "filter": {
            "value": "database",
            "property": "object"
        },
        "sort": {
            "direction": "ascending",
            "timestamp": "last_edited_time"
        }
    })
};

fetch(apiUrl, requestOptions).then(response => {
    console.log(response.body)
})
```

### 通过NotionSDK
```javascript
import {Client} from "@notionhq/client"

const notion = new Client({
    auth: NOTION_API_TOKEN,
    baseUrl: "https://{{YOUR_DOMAIN}}/notion-api/https://api.notion.com",
})
```