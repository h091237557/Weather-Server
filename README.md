# Weather-Server

此專案為定時的至[自動氣象站-氣象觀測資料](https://opendata.cwb.gov.tw/dataset/observation/O-A0001-001)取得氣象資料，並且提供 API 給用戶查詢。

## Tech

* Nodejs V13.1
* Express
* MongoDB 4
* Docker
* Mocha 

## Quick Start

```
git clone https://github.com/h091237557/Weather-Server.git
npm install
npm run start
```

## API

### Get Weather [GET] /weathers/{City code}

目前提供以上三個城市的氣象查詢。

* 台北市 : "01"
* 新北市 : "06"
* 桃園市 : "08"

**Request**

```
curl 127.0.0.1:3000/weathers/01
```

**Response 200**

```
{ 
  "city":"台北市",
  "maximum_temperature":29,
  "minimum_temperature":23
}
```

**Response 404**

```
{"error":"Empty Resource Error"}
```
