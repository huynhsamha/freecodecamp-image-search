# freecodecamp-image-search

### Challenge at [freeCodeCamp](https://www.freecodecamp.org)

[https://www.freecodecamp.org/challenges/image-search-abstraction-layer](https://www.freecodecamp.org/challenges/image-search-abstraction-layer)


### Deploy it to Glitch
[https://feather-option.glitch.me/new/http://github.com/huynhsamha](https://feather-option.glitch.me/new/http://github.com/huynhsamha)


### User Story
+ I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
+ I can paginate through the responses by adding a ?offset=2 parameter to the URL
+ I can get a list of the most recently submitted search strings.


### Usage with Custom Search Engine (Google API)
#### NPM package: `googleapis`
Reference here [https://github.com/google/google-api-nodejs-client](https://github.com/google/google-api-nodejs-client)

#### Google API Key
+ Go to [https://console.cloud.google.com/](https://console.cloud.google.com/)
+ Create new project
+ Create new Credential Key and get API Key
+ Copy API Key to file `.env`, such as:
```bash
GG_API_KEY=[api key here]
```

#### Custom Search Engine
+ Go to [https://cse.google.com/cse/all](https://cse.google.com/cse/all)
+ Create new Search Engine (sites to search, maybe if you need)
+ After create, go to edit the engine
+ Image Search, check ON (to get thumbnail)
+ Sites to Search (check out Search the entire web but emphasize included sites)
+ Update
+ Test with your custom search in the website
+ Get code cx
+ Copy to file `.env`
```bash
GG_CX=[cx here]
```

#### Usage with NodeJS
Follow document/example at [https://github.com/google/google-api-nodejs-client/tree/master/samples/customsearch](https://github.com/google/google-api-nodejs-client/tree/master/samples/customsearch)
