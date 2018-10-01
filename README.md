# 9news-scraper

9 News scraper gets article titles and links from the Denver 9 News website on a button click. After the article titles are displayed the user can save any of the articles to favorites and add notes to individual articles. All the data is persistent.

## Visit the deployed version of [9 News Scrape](https://ancient-sierra-32891.herokuapp.com)

![homepage](chewzy_video.gif)

## Getting Started
to install locally run this command in your terminal
```
git clone https://github.com/innaleikina/9news-scrape.git
```
once inside the 9news-scrape folder run 
```
npm install
```

You will also need to set up a MongoDB , you can call it anything, but change it to your own name in the server file on the line that defines var MONGODB_URI

```
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/homeworkScraper";
```

The last step is to make sure your express sever is running and and type this command in your termial
```
node server.js
```

### Prerequisites

* [Nodejs](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com)


## Built With

* [Expressjs](https://expressjs.com/) 
* [MongoDB](https://www.mongodb.com) 
* [Express](http://expressjs.com/)
* [Mongoose](https://mongoosejs.com/)
* [Cheerio](https://www.npmjs.com/package/cheerio)


## Author
* [Inna Leikina](https://github.com/innaleikina)

