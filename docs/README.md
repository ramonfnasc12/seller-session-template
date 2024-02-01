# Regionalization

First the GET endpoint /_v/regionalize?postalCode=XXX&country=XXX must be called to receive the available sellers for a region

The response will be an array with the available sellers

Within this response, the custom frontend regionalization component must call the code below, in order to regionalize the sellers in the session. The "value" in the request must be sent with all the available sellers in the response from the previous call separeted by ;, such as

```
GET sellers per region response:
["APACManufacturer1",
"APACManufacturer2",
"APACManufacturer3",
"APACManufacturer4"]

Value sent in the update session request:
sellername=APACManufacturer1;sellername=APACManufacturer2;sellername=APACManufacturer3;sellername=APACManufacturer4;
```

````
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "public": {
    "facets": {
      "value": "sellername=APACManufacturer;"
    }
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://session--b2bemea.myvtex.com/api/sessions?items=profile.id,profile.email,profile.firstName,profile.lastName,profile.isAuthenticated,store.channel,store.countryCode,store.cultureInfo,store.currencyCode,store.currencySymbol,storefront-permissions.priceTables,public.items,public.supportedLocales,search.facets", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
````
The `search-session` listens to changes in the user session via the `search/session/transform` and writes it to the segment cookie.

When the session API is called:

```
curl --request POST \
  --url https://{ws}--{account}.myvtex.com/api/sessions \
  --header 'Content-Type: application/json' \
  --header 'Cookie: vtex_session={mysession}' \
  --data '{
    "public": {
        "facets": {
            "value": "myfacet=myvalue;"
        }
    }
}'
```

It will call the `search/session/transform` with the following body:

```
{
     "public": {
        "facets": {
            "value": "myfacet=myvalue;"
        }
    }
}
```

Then, the search session will add the `facets: myfacet=myvalue` to the segment cookie.
