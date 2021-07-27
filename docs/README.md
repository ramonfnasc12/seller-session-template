# search-session

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
